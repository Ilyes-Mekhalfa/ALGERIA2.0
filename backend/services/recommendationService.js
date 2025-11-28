import Product from '../models/product.model.js'
import { spawn } from 'child_process';

const rankListings = async (userWilaya, userMinQuantity, limit) => {
    console.log(userWilaya , userMinQuantity);
    
    // --- 1. Hard Filter via Database Query ---
    const hardFilteredListings = await Product.find({
        // A. Wilaya Match Filter (Exact match)
        wilaya: userWilaya, 
        // B. Quantity Match Filter (Available quantity >= user's minimum requirement)
        stock: { $gte: userMinQuantity },
        // C. Availability (Ensure it's not sold out)
    }).lean(); 

    if (hardFilteredListings.length === 0) {
        return [];
    }

    // --- 2. Prepare Features for the Model ---
    const qualityMap = { 'Commercial': 1, 'Standard': 2, 'Premium': 3 };

    const modelFeatures = hardFilteredListings.map(listing => {
        // NOTE: Since the listing's wilaya already matches userWilaya (due to Step A), wilaya_match is always 1
        const wilaya_match = 1; 

        return {
            wilaya_match: wilaya_match,
            quality_score: qualityMap[listing.quality_grade] || 2, // Map quality string to score (default: 2)
            price: listing.price,
            stock: listing.stock,
            seller_rating: listing.seller_rating || 4.0,
            high_seller_rating: (listing.seller_rating || 4.0) >= 4.5 ? 1 : 0,
            is_fresh_listing: listing.createdAt && (Date.now() - listing.createdAt) <= 7 * 24 * 60 * 60 * 1000 ? 1 : 0,
            // Include product ID to join back later
            product_id: listing._id 
        };
    });

    // --- 3. Run Prediction Script (if available) ---
    let scores;
    try {
        scores = await runPythonPredictScript(modelFeatures);
    } catch (err) {
        console.warn('[Recommendation] Python predict script failed, using fallback scores:', err.message);
        // Fallback: assign simple scores based on quality and freshness
        scores = modelFeatures.map(f => (f.quality_score / 3) * 0.5 + (f.is_fresh_listing ? 0.5 : 0.2));
    }
    
    // --- 4. Rank Listings ---
    const rankedListings = hardFilteredListings.map((listing, index) => ({
        ...listing,
        recommendation_score: scores[index] || 0.5
    }));
    
    // Sort by the score (highest probability first)
    rankedListings.sort((a, b) => b.recommendation_score - a.recommendation_score);

    // Return the top N listings
    return rankedListings.slice(0, limit);
};


async function runPythonPredictScript(features) {
    return new Promise((resolve, reject) => {
        // 1. Spawn the Python process
        const pythonProcess = spawn('python3', ['predict.py']); 
        
        let data = '';
        let error = '';

        // 2. Collect the output (the scores)
        pythonProcess.stdout.on('data', (chunk) => {
            data += chunk.toString();
        });

        // 3. Collect errors (for debugging)
        pythonProcess.stderr.on('data', (chunk) => {
            error += chunk.toString();
        });

        // 4. Pass the features to Python via stdin
        pythonProcess.stdin.write(JSON.stringify(features));
        pythonProcess.stdin.end();

        // 5. Handle process exit
        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Python script failed with code ${code}. Error: ${error}`);
                return reject(new Error('Model prediction failed.'));
            }
            try {
                // The Python script prints a JSON array of scores
                const scores = JSON.parse(data);
                resolve(scores);
            } catch (e) {
                console.error("Failed to parse prediction output:", data);
                reject(new Error("Invalid output from prediction script."));
            }
        });
    });
}
// Export as a class/object for consistency
const RecommendationService = {
    rankListings
};

export default RecommendationService;
export { rankListings };
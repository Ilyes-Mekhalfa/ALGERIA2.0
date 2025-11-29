import Product from '../models/product.model.js'
import { spawn, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rankListings = async (userWilaya, userMinQuantity, limit) => {
    
    // --- 1. Hard Filter via Database Query ---
    const hardFilteredListings = await Product.find({
        wilaya: userWilaya, 
        stock: { $gte: userMinQuantity },
    }).lean(); 

    if (hardFilteredListings.length === 0) {
        return [];
    }

    // --- 2. Prepare Features for the Model ---
    const qualityMap = { 'Commercial': 1, 'Standard': 2, 'Premium': 3 };
    console.log(qualityMap);
    
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
        console.log('modelFeatures:', modelFeatures);
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
        // Determine script path (try several likely locations relative to CWD and this service file)
        const candidateScriptPaths = [
            path.join(process.cwd(), 'ml-models', 'recommender', 'predict.py'),
            path.join(process.cwd(), 'backend', 'ml-models', 'recommender', 'predict.py'),
            path.join(__dirname, '..', 'ml-models', 'recommender', 'predict.ipynb'),
            path.join(__dirname, '..', '..', 'ml-models', 'recommender', 'predict.py')
        ];

        let scriptPath = null;
        console.log('Looking for prediction script in paths:', candidateScriptPaths);
        for (const p of candidateScriptPaths) {
            try {
                if (fs.existsSync(p)) {
                    scriptPath = p;
                    break;
                }
            } catch (e) {
                // ignore
            }
        }

        if (!scriptPath) {
            return reject(new Error('Prediction script not found.'));
        }
        
        // Helper to validate python executable by checking --version
        function findPythonExecutable() {
            const envPath = process.env.PYTHON_EXECUTABLE;
            const candidates = [];
            if (envPath) candidates.push(envPath);
            candidates.push('python');
            candidates.push('python3');
            candidates.push('py');

            for (const cmd of candidates) {
                try {
                    const res = spawnSync(cmd, ['--version'], { encoding: 'utf8' });
                    if (res && typeof res.status === 'number' && res.status === 0 && (res.stdout || res.stderr)) {
                        return cmd;
                    }
                } catch (e) {
                    // try next
                }
            }
            return null;
        }

        const pythonCmd = findPythonExecutable();
        if (!pythonCmd) {
            return reject(new Error('No Python executable found on PATH and PYTHON_EXECUTABLE not set.'));
        }

        const pythonProcess = spawn(pythonCmd, [scriptPath], { cwd: path.dirname(scriptPath) });
        let data = '';
        let error = '';

        pythonProcess.stdout.on('data', (chunk) => {
            data += chunk.toString();
        });
        pythonProcess.stderr.on('data', (chunk) => {
            error += chunk.toString();
        });

        // Add explicit error handler so we don't get unhandled exceptions on ENOENT
        pythonProcess.on('error', (err) => {
            return reject(err);
        });

        // Pass the features to Python via stdin
        try {
            pythonProcess.stdin.write(JSON.stringify(features));
            pythonProcess.stdin.end();
        } catch (e) {
            // If writing to stdin fails, kill process and reject
            try { pythonProcess.kill(); } catch (xx) {}
            return reject(e);
        }

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error(`Python script exited with code ${code}. stderr: ${error}`));
            }
            try {
                const scores = JSON.parse(data);
                resolve(scores);
            } catch (e) {
                return reject(new Error('Invalid JSON output from prediction script.'));
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
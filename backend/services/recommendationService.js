import recombee  from 'recombee-api-client';
const rqs = recombee.requests;

// Assumed client setup
// const client = new recombee.ApiClient('YOUR_DB_ID', 'YOUR_PRIVATE_TOKEN'); 

async function setupItemProperties(client) {
    try {
        // 1. Define Wilaya property
        await client.send(new rqs.AddItemProperty('wilaya', 'string'));
        console.log('Added wilaya property.');
        
        // 2. Define Quantity property (using double for precise amounts)
        await client.send(new rqs.AddItemProperty('available_quantity_kg', 'double'));
        console.log('Added available_quantity_kg property.');

        // 3. Define Quality property
        await client.send(new rqs.AddItemProperty('quality_grade', 'string'));
        console.log('Added quality_grade property.');

        // 4. (Optional but crucial) Define the product type/category
        await client.send(new rqs.AddItemProperty('product_category', 'string'));
        console.log('Added product_category property.');

    } catch (error) {
        // Handle errors, typically property already exists (which is fine)
        console.error('Error adding properties (may already exist):', error.message);
    }
}
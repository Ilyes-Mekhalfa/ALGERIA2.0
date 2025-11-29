import sys
import json
import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

def get_most_bought_products(limit=10):
    
    MONGO_URI = os.getenv("DATABASE_URL")
    DB_NAME = "agroConnect"           
    COLLECTION_NAME = os.getenv("orders") 

    try:
        client = MongoClient(MONGO_URI)
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]
        
        cursor = collection.find({})
        data = list(cursor)
        client.close()

        if not data:
            return {'error': 'No data found in the collection.'}

        df = pd.DataFrame(data)
        if '_id' in df.columns:
            df = df.drop('_id', axis=1)

        # Ensure required columns exist
        if 'product_name' not in df.columns or 'quantity' not in df.columns:
            return {'error': 'Missing "product_name" or "quantity" column in your data.'}

        # Calculate most bought products
        most_bought = df.groupby('product_name')['quantity'].sum().sort_values(ascending=False)
        
        # Convert to a list of dictionaries for JSON output
        result_list = most_bought.head(limit).reset_index().to_dict(orient='records')
        
        return {'most_bought_products': result_list}

    except Exception as e:
        return {'error': f'An error occurred: {e}'}

if __name__ == '__main__':
    # You can optionally take a 'limit' argument from command line
    limit = 10 
    if len(sys.argv) > 1:
        try:
            limit = int(sys.argv[1])
        except ValueError:
            pass # Use default limit if argument is not a valid number

    result = get_most_bought_products(limit)
    print(json.dumps(result))


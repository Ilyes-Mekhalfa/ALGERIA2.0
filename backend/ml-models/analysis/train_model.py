import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics import accuracy_score
import joblib
import os

print("--- Starting Model Training Process ---")

# --- Step 1: Load and Prepare Your Data ---
# In a real scenario, you would load this from your MongoDB database.
# For this script, we'll use a larger sample DataFrame that reflects the data we need.
sample_data = {
    'product_name': ['Tomatoes', 'Tomatoes', 'Apples', 'Apples', 'Wheat', 'Wheat', 'Tomatoes', 'Apples', 'Wheat', 'Tomatoes', 'Apples', 'Wheat'],
    'price':          [1.5,        1.6,        2.0,      2.1,      300,      305,     1.2,        2.05,     290,     1.3,        2.1,      295],
    'purchase_date':  ['2023-07-05', '2023-07-08', '2023-07-15', '2023-07-18', '2023-07-22', '2023-07-25', '2023-08-02', '2023-08-05', '2023-08-12', '2023-08-21', '2023-08-24', '2023-08-28'],
    'quantity':       [100,        50,         200,      150,      10,       12,      80,         180,      8,       90,         170,      9]
}
df = pd.DataFrame(sample_data)
df['purchase_date'] = pd.to_datetime(df['purchase_date'])
print("1. Data loaded and purchase_date converted to datetime.")

# --- Step 2: Feature Engineering (Adding Season and Weather) ---

# Add 'season' column
def get_season(date):
    month = date.month
    if month in [3, 4, 5]: return 'Spring'
    elif month in [6, 7, 8]: return 'Summer'
    elif month in [9, 10, 11]: return 'Autumn'
    else: return 'Winter'
df['season'] = df['purchase_date'].apply(get_season)

# Add 10-day 'weather_period' column
def get_day_period(date):
    day = date.day
    if day <= 10: return 'Period 1'
    elif day <= 20: return 'Period 2'
    else: return 'Period 3'
df['weather_period'] = df['purchase_date'].dt.strftime('%Y-%m') + '-' + df['purchase_date'].apply(get_day_period)

# Add 'weather_condition' based on your team's observations
# !!! IMPORTANT: You must expand this mapping for your real data !!!
period_to_weather_mapping = {
    '2023-07-Period 1': 'Sunny',
    '2023-07-Period 2': 'Sunny',
    '2023-07-Period 3': 'Rainy',
    '2023-08-Period 1': 'Heat Wave',
    '2023-08-Period 2': 'Heat Wave',
    '2023-08-Period 3': 'Stormy',
}
df['weather_condition'] = df['weather_period'].map(period_to_weather_mapping)
print("2. Feature engineering complete (season, weather_period, weather_condition added).")

# --- Step 3: Create the Target Variable ('price_change') ---
# Calculate the average price for each product within each period
avg_prices = df.groupby(['product_name', 'weather_period'])['price'].mean().reset_index()
avg_prices = avg_prices.sort_values(['product_name', 'weather_period'])

# Get the price from the previous period to see the change
avg_prices['previous_price'] = avg_prices.groupby('product_name')['price'].shift(1)

# Define the price change ('Up', 'Down', 'Stable')
def get_price_change(row):
    if pd.isna(row['previous_price']):
        return 'Stable' # Default for the first-ever entry of a product
    if row['price'] > row['previous_price'] * 1.02: # Price went up more than 2%
        return 'Up'
    elif row['price'] < row['previous_price'] * 0.98: # Price went down more than 2%
        return 'Down'
    else:
        return 'Stable'
avg_prices['price_change'] = avg_prices.apply(get_price_change, axis=1)

# Merge the calculated price_change back into the main DataFrame
model_df = pd.merge(df, avg_prices[['product_name', 'weather_period', 'price_change']], on=['product_name', 'weather_period'])
print("3. Target variable 'price_change' created.")

# --- Step 4: Prepare Data for the Model ---
# We want to predict 'price_change' based on product and weather.
# Drop duplicates because each sale in the same period/product has the same outcome.
features_df = model_df[['product_name', 'weather_condition', 'price_change']].drop_duplicates().dropna()

X = features_df[['product_name', 'weather_condition']]
y = features_df['price_change']

# Convert categorical features (text) into numbers using One-Hot Encoding
encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
X_encoded = encoder.fit_transform(X)
print("4. Data prepared for model (features selected and encoded).")

# --- Step 5: Train the Machine Learning Model ---
# Split data into 80% for training and 20% for testing
X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42, stratify=y)

# Initialize and train the Random Forest Classifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
print("5. Model training complete.")

# --- Step 6: Evaluate the Model (Optional but good practice) ---
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"6. Model accuracy on test data: {accuracy * 100:.2f}%")

# --- Step 7: Save the Model and Encoder ---
# This is the final and most important step for your backend
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'price_model.joblib')
ENCODER_PATH = os.path.join(BASE_DIR, 'encoder.joblib')

joblib.dump(model, MODEL_PATH)
joblib.dump(encoder, ENCODER_PATH)

print("\n--- Model and Encoder Saved Successfully! ---")
print(f"Model saved to: {MODEL_PATH}")
print(f"Encoder saved to: {ENCODER_PATH}")
print("You can now run your Express.js server.")


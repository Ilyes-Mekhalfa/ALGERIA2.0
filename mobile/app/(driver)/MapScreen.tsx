import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native'; // Removed StyleSheet, using NativeWind
import MapView, { PROVIDER_DEFAULT, Region, UrlTile } from 'react-native-maps';

// Make sure you import the `tw` utility from NativeWind if you use it for dynamic classes.
// For static classes like below, just ensure your `babel.config.js` is set up.
// import { tw } from 'nativewind'; 

export default function MapScreen() {
  // State to hold map region (includes latitudeDelta, longitudeDelta for zoom)
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied. Please enable it in your device settings.');
        setIsLoading(false);
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        console.log("Got location:", currentLocation.coords);

        setMapRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.015, // Zoom level
          longitudeDelta: 0.0121, // Zoom level
        });
      } catch (error) {
        console.error("Error getting location:", error);
        setErrorMsg('Could not fetch your current location. Please try again.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2 text-gray-700">Finding your location...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View className="flex-1 justify-center items-center bg-red-50">
        <Text className="text-red-700 text-center px-4">{errorMsg}</Text>
        <Text className="mt-2 text-gray-600 text-center px-4">
          Check your app permissions in device settings and restart the app.
        </Text>
      </View>
    );
  }

  // Only render MapView if mapRegion is available
  if (!mapRegion) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-gray-500">Map data not available.</Text>
      </View>
    );
  }

 return (
    <View className="flex-1 bg-white">
      {/* Ensure this MapView is visible if you commented out the text overlay for debugging */}
      <MapView
        provider={PROVIDER_DEFAULT}
        style={{ flex: 1 }}// This must be flex-1
        region={mapRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        
      >
        <UrlTile
    urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    maximumZ={19}
  />
      </MapView>
      
      {/* Make this DEBUG text more prominent and absolute positioned to ensure it's on top */}
      <View className='absolute bottom-10 left-0 right-0 p-4 bg-yellow-200'> 
        <Text className='text-red-800 text-center font-bold text-lg'>
          DEBUG: Lat: {mapRegion.latitude}, Long: {mapRegion.longitude}
        </Text>
        <Text className='text-red-800 text-center text-sm'>
            mapRegion is NOT NULL, trying to render MapView.
        </Text>
      </View>
    </View>
  );
}
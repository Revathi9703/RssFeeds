import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, Text, Alert, PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../redux/slices/newsSlice";
import { getWeather } from "../redux/slices/weatherSlice";
import { RootState, AppDispatch } from "../redux/store";
import WeatherCard from "../components/WeatherCard";
import NewsCard from "../components/NewsCard";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

const getCategoryByWeather = (temp: number): string => {
  if (temp < 10) return "health"; // Cold → Health News
  if (temp > 30) return "disasters"; // Hot → Disaster News
  return "technology"; // Cool → Tech News
};

const FilteredNewsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, status } = useSelector((state: RootState) => state.news);
  const { data: weather, status: weatherStatus } = useSelector((state: RootState) => state.weather);
  const { temperatureUnit } = useSelector((state: RootState) => state.settings);
  const [newsCategory, setNewsCategory] = useState<string>("general");

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Permission Denied", "Location permission is required to show local news.");
          return;
        }
      } else {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result !== RESULTS.GRANTED) {
          Alert.alert("Permission Denied", "Location permission is required to show local news.");
          return;
        }
      }

      getCurrentLocation();
    } catch (error) {
      console.error("Permission Error:", error);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(getWeather({ lat: latitude, lon: longitude })); // Fetch weather using live location
      },
      (error) => {
        console.error("Error getting location:", error);
        Alert.alert("Location Error", "Unable to fetch location. Using default location.");
        dispatch(getWeather({ lat: 11.1271, lon: 78.6569 })); 
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    if (weather) {
      const category = getCategoryByWeather(weather.main.temp);
      setNewsCategory(category);
      dispatch(getNews(category));
    }
  }, [weather, dispatch]);

  return (
    <View style={styles.container}>
      {weatherStatus === "loading" ? (
        <ActivityIndicator size="large" color="#4a90e2" />
      ) : (
        weather && (
          <WeatherCard
            weather={{
              temp: weather.main.temp,
              condition: weather.weather[0].description,
              icon: weather.weather[0].icon,
              location: weather.name,
            }}
            unit={temperatureUnit}
          />
        )
      )}

      <Text style={styles.categoryText}>
        Showing <Text style={{ color: "#8ac926" }}>{newsCategory.toUpperCase()}</Text> news
      </Text>

      {status === "loading" ? (
        <ActivityIndicator size="large" color="#4a90e2" />
      ) : articles.length > 0 ? (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <NewsCard article={item} />}
        />
      ) : (
        <Text style={styles.noNewsText}>No news available for this category.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 25 },
  categoryText: { fontSize: 20, fontWeight: "bold", color: "black", marginVertical: 10 },
  noNewsText: { textAlign: "center", marginTop: 20, color: "black" },
});

export default FilteredNewsScreen;

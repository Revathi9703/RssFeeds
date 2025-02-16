import React, { useEffect, useRef, useState } from "react";
import { 
  View, FlatList, ActivityIndicator, StyleSheet, Text, Alert, PermissionsAndroid, Platform 
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../redux/slices/newsSlice";
import { getWeather } from "../redux/slices/weatherSlice";
import { RootState, AppDispatch } from "../redux/store";
import WeatherCard from "../components/WeatherCard";
import NewsCard from "../components/NewsCard";
import NewsSliderCard from "../components/NewsSliderCard"; 
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

const AllNewsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, status } = useSelector((state: RootState) => state.news);
  const { data: weather, status: weatherStatus } = useSelector((state: RootState) => state.weather);
  const { temperatureUnit } = useSelector((state: RootState) => state.settings);

  const sliderRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);

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
        setLocation({ lat: latitude, lon: longitude });
        dispatch(getWeather({ lat: latitude, lon: longitude }));
        dispatch(getNews("general")); // Fetch India news
      },
      (error) => {
        console.error("Location Error:", error);
        Alert.alert("Location Error", "Unable to fetch location.");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    if (articles.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= articles.slice(0, 5).length) {
          sliderRef.current?.scrollToIndex({ index: 0, animated: false });
          return 0;
        } else {
          sliderRef.current?.scrollToIndex({ index: nextIndex, animated: true });
          return nextIndex;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [articles]);

  return (
    <View style={styles.container}>
      {status === "loading" ? (
        <ActivityIndicator size="large" color="#4a90e2" />
      ) : articles.length > 0 ? (
        <FlatList
          ref={sliderRef}
          data={articles.slice(0, 5)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <NewsSliderCard article={item} />}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ height: 400 }}
          initialScrollIndex={0}
          getItemLayout={(data, index) => ({
            length: 250,
            offset: 250 * index,
            index,
          })}
          onScrollToIndexFailed={(info) => {
            console.warn("Scroll failed:", info);
          }}
        />
      ) : null}

      <Text style={styles.title}>Latest News</Text>

      {status === "loading" ? (
        <ActivityIndicator size="large" color="#4a90e2" />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <NewsCard article={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#006d77",
    marginVertical: 14,
  },
  slider: {
    height: 400,
    marginVertical: 10,
  },
});

export default AllNewsScreen;

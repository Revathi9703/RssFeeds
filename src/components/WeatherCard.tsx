import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import CloudIcon from 'react-native-vector-icons/Entypo'

interface WeatherCardProps {
  weather: {
    temp: number;
    condition: string;
    icon: string;
    location: string;
  };
  unit: "Celsius" | "Fahrenheit";
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, unit }) => {
  return (
    <ImageBackground source={require("../assets/Weathercard.png")}  style={styles.card}>
    <View style={styles.detailsContainer}>
      <Text style={styles.location}>{weather.location}</Text>
      <Text style={styles.temp}>
        {weather.temp}° {unit === "Celsius" ? "C" : "F"}
      </Text>
      <Text style={styles.condition}>{weather.condition}</Text>
    </View>

     {(weather?.icon == null || undefined) ?  
    <Image
      source={{ uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png` }}
      style={styles.icon}
    />
     :
    <CloudIcon name="cloud" size={100} color={"white"} style={{end:25,top:30}}/>
     }

  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 20,
    paddingHorizontal:10,
    borderRadius: 15,
    marginVertical: 10,
    width: "100%",
    alignSelf: "center",
    height:200,
    resizeMode:"contain"
    // backgroundColor:"#d5bdaf"
  },
  detailsContainer: {
    flex: 1, // Takes up remaining space on the left
  },
  location: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  temp: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ff006e",
    marginVertical: 5,
  },
  condition: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#fff",
  },
  icon: {
    width: 100,
    height: 100,
  },
});

export default WeatherCard;

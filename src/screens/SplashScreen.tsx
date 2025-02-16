import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
       navigation.replace("Home"); // Navigate to Home after animation
    }, 3000); // Adjust based on animation length
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/animation.json")}  // Ensure this is a .json file
        autoPlay
        loop={false}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0396A6",
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 300, 
    height: 300,
  },
});

export default SplashScreen;

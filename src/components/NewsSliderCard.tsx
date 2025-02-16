import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

const NewsSliderCard = ({ article }) => {
  return (
    <ImageBackground source={{ uri: article.urlToImage }} style={styles.image} imageStyle={styles.imageStyle}>
      <View style={styles.overlay}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    marginHorizontal: 10,
    justifyContent: "flex-end", // Push text to the bottom
  },
  imageStyle: {
    borderRadius: 10, // Ensures image has rounded corners
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for readability
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default NewsSliderCard;

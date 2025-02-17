import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

const NewsSliderCard = ({ article }) => {
  if (!article.urlToImage) {

    return (
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>No Image Available</Text>
        <Text style={styles.placeholderTitle} numberOfLines={2}>
          {article.title}
        </Text>
      </View>
    );
  }

  return (
    <ImageBackground 
      source={{ uri: article.urlToImage }} 
      style={styles.image} 
      imageStyle={styles.imageStyle}
    >
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
    justifyContent: "flex-end",
  },
  imageStyle: {
    borderRadius: 10,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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

  // Placeholder Styles
  placeholderContainer: {
    width: 300,
    height: 200,
    marginHorizontal: 10,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  placeholderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#777",
  },
  placeholderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginTop: 5,
  },
});

export default NewsSliderCard;

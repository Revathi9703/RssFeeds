import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from "react-native";

interface NewsCardProps {
  article: {
    title: string;
    description: string;
    urlToImage: string | null;
    url: string;
  };
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  // If the article has no image, do not render the component
  if (!article.urlToImage || article.urlToImage.trim() === "") {
    return null;
  }

  return (
    <TouchableOpacity onPress={() => Linking.openURL(article.url)} style={styles.card}>
      <View style={styles.container}>
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text numberOfLines={3} style={styles.title}>{article.title}</Text>
          <Text numberOfLines={2} style={styles.description}>{article.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  container: {
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 10,
    alignItems: "center",
  },
  image: {
    width: "45%",
    height: 100,
    borderRadius: 12,
  },
  textContainer: {
    padding: 10,
    width: "50%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});

export default NewsCard;

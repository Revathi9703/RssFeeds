import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuIcon from "react-native-vector-icons/Entypo"

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
       <MenuIcon name="menu" size={25} color={'white'}/> 
      <Text style={styles.title}>Weather News</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Image
          source={require("../assets/pro_img.png")} // Placeholder Profile Image
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#0396A6",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;

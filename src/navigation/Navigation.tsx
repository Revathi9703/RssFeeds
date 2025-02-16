import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AllNewsScreen from "../screens/AllNewsScreen";
import FilteredNewsScreen from "../screens/FilteredNewsScreen";
import Header from "../components/Header";
import SettingsScreen from "../screens/SettingsScreen";
import SplashScreen from "../screens/SplashScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      header: () => <Header />,
      tabBarStyle: {
        height: 70,
        backgroundColor: "white",
        
      },
    }}
    
  >
    <Tab.Screen
      name="All News"
      component={AllNewsScreen}
      options={{
        tabBarActiveBackgroundColor:"#d8e2dc",
        tabBarIcon: ({focused}) => (
          <MaterialCommunityIcons name="newspaper" size={30} color={focused ?"#0396A6":"grey"} />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ?"#0396A6":"grey", marginBottom: 10 }}>All News</Text>
        ),
      }}
    />
    <Tab.Screen
      name="Filtered News"
      component={FilteredNewsScreen}    
      options={{
        tabBarActiveBackgroundColor:"#d8e2dc",
        tabBarIcon: ({focused}) => (
          <MaterialCommunityIcons name="weather-cloudy-clock" size={33} color={focused ?"#0396A6":"grey"} />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ?"#0396A6":"grey", marginBottom: 10 }}>Filtered News</Text>
        ),
      
      }}
    />
  </Tab.Navigator>
);


const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />    
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;

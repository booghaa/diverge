import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome, Foundation, Ionicons } from "@expo/vector-icons";
import Watchlist from "../screens/Watchlist";
import Search from "../screens/Search";
import News from "../screens/News";
import { useColorMode, useTheme } from "native-base";
import { colors } from "react-native-elements";


const Tab = createBottomTabNavigator();


export default function BottomTabNavigator() {
  const { colorMode } = useColorMode()
  const theme  = useTheme()

  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colorMode === "light" ? "white" : theme.colors.blueGray[900],
          shadowOpacity: "0.5",
          borderTopWidth: "0"
        },

        headerShown: false,
        tabBarShowLabel: false,
      }}
      
    >
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="search" size={focused ? 30 : 25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={Watchlist}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => (
            <Foundation name="graph-pie" size={focused ? 35 : 30} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="News"
        component={News}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => (
            <Entypo name="news" size={focused ? 30 : 25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


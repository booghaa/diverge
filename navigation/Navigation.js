import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigator from "./BottomTabNavigator";
import { Ionicons } from '@expo/vector-icons'; 
import StockView from "../screens/StockView";
import { ToggleDarkMode } from "../components/ToggleDarkMode";
import { IconButton } from "native-base";

//import AddToPortfolio from "../screens/AddToPortfolio";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="StockView"
        component={StockView}
      
        options={({ route, navigation }) => ({
          headerShown: false,
          /*
          headerBackTitle: "",
          headerTintColor: 'lightBlue.400',
          headerRight: ({}) => <ToggleDarkMode/>,
          headerTitle: route.params.name,
          */
          
         
        })}
        
      />
        {/*
      <Stack.Screen
        name="AddToPortfolio"
        component={AddToPortfolio}
        options={{
          title: "AddToPortfolio",
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    */}
    </Stack.Navigator>
  );
};



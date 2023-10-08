import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from'@react-navigation/native'
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import Navigation from "../navigation/Navigation";
import { Box } from "native-base";
import WatchlistProvider from "./WatchlistProvider";
const LinearGradient = require("expo-linear-gradient").LinearGradient;
export default function AppContainer (props) {
  const config = {
    dependencies: {
      "linear-gradient": LinearGradient
    }
  };
  return (
    <NavigationContainer>
      
        <NativeBaseProvider config={config}>
          <WatchlistProvider>
             {props.children}
          </WatchlistProvider>
        </NativeBaseProvider>
      
    </NavigationContainer>
  )
}




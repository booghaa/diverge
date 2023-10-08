import React from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  IconButton,
  Icon,
  Flex,
} from "native-base";
import { Entypo } from "@native-base/icons";
import { NavigationContainer } from'@react-navigation/native'
import AppContainer from "./components/AppContainer";
import { View } from "react-native";
import Navigation from "./navigation/Navigation";



// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
export default function App() { 
  return(
    <AppContainer>
		<Navigation/>
    </AppContainer>
  )
}

function Bob() {
	return (
		<Box
			_dark={{ bg: "primary.900" }}
			_light={{ bg: "primary.50" }}
			px={4}
			flex={1}
		>
			
			<ToggleDarkMode/>
			
			<Center flex={1}>
				<VStack space={5} alignItems="center">
					<Heading size="lg">Welcome to NativeBase</Heading>
					<HStack space={2} alignItems="center">
						<Text>Edit</Text>
						<Box
						_web={{
							_text: {
							fontFamily: "monospace",
							fontSize: "sm",
							},
						}}
						px={2}
						py={1}
						_dark={{ bg: "primary.800" }}
						_light={{ bg: "primary.200" }}
						>
						App.js
						</Box>
						<Text>and save to reload.</Text>
					</HStack>
					<Link href="https://docs.nativebase.io" isExternal>
						<Text color="primary.500" underline fontSize={"xl"}>
						Learn NativeBase
						</Text>
					</Link>
				
					
				</VStack>
			</Center>
		</Box>

	);
}

// Color Switch Component


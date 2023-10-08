import React from "react";
import {
  
  HStack,
  View,
  useColorMode,
  Heading,
  IconButton,
  Icon,
  Flex,
} from "native-base";
import { StatusBar } from "expo-status-bar";
import { Entypo, Ionicons } from "@native-base/icons";
import { useNavigation } from "@react-navigation/native";

export function ToggleDarkMode() {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
    <Flex direction="row-reverse">
		<StatusBar style={colorMode === "light" ? "dark" : "light"}/>
		<HStack space={2} alignItems="center">
			<IconButton
			icon={colorMode === "light" ? <Icon as={Entypo} name="moon" color="darkBlue.700" /> : <Icon as={Entypo} name="light-up" color={'lightBlue.400'} /> }
			
			onPress={toggleColorMode}
			/>
		</HStack>
	</Flex>
	);
}
export function StockViewHeader({name}) {
	const navigation = useNavigation()
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		
		<View flexDirection="row" justifyContent={"space-between"} pb={5} >
			<StatusBar style={colorMode === "light" ? "dark" : "light"}/>
			<IconButton
			icon={colorMode === "light" ? <Icon as={Ionicons} size={7} name="arrow-back-outline" color="darkBlue.700" /> : <Icon as={Ionicons} size={7}name="arrow-back-outline" color={'lightBlue.400'} /> }
			onPress={()=> navigation.goBack()}
			/>
			<Heading size="md" top={2.5}>
				{/*name*/}
			</Heading>
			<IconButton
			icon={colorMode === "light" ? <Icon as={Entypo} name="moon" color="darkBlue.700" /> : <Icon as={Entypo} name="light-up" color={'lightBlue.400'} /> }
			onPress={toggleColorMode}
			/>		
		</View>
	
		
		
	);
}
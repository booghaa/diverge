import React from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Input,
  useColorMode,
  Spacer,
  NativeBaseProvider,
  extendTheme,
  Pressable,
  VStack,
  FlatList,
  View,
  Button,
  Box,
  IconButton,
  Icon,
  Flex,
  Divider,
  theme,
  Stack,
  ScrollView,
  
  
} from "native-base";
import { useNavigation } from '@react-navigation/native';

import { StyleSheet } from "react-native";
import { ToggleDarkMode } from "../components/ToggleDarkMode";
import { Entypo, Ionicons, MaterialIcons } from "@native-base/icons";
import { render } from "react-dom";




export default function Search() {

  const navigation = useNavigation();

  const [text, setText] = React.useState("")
  const tickers = require("../data/allstocks.json")
  const [filtered, setFiltered] = React.useState([...tickers])
  
  
  const filterResults = (text) => {
    setText(text)
    if (text.length > 0){
      const newData = tickers.filter(function (item) {
        const itemData = item.symbol
          ? item.symbol.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFiltered(newData);
    }
    else{
      setFiltered(tickers)
    }   
  };
  const deleteText = () => { 
    setText("")
    setFiltered(tickers)
  }
  return (
    <Box
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50"}}
        px={4}
        flex={1}
        
        paddingTop={10}
       
    >
        <ToggleDarkMode/>
        <Stack space={4}>
          <Heading size="xl">Stocks</Heading>
          <Input
            size="lg" 
            variant="rounded" 
            placeholder="Search..."
            value={text}
            onChangeText={(text) => filterResults(text)}
            InputLeftElement={<Icon as={<Ionicons name="ios-search"/>} size={5} ml="2" color="muted.400" />}
            type={text.length > 0 ? "text" : "text"}
            /*InputRightElement={<Button size="xs" bg={"blueGray.500"} rounded="none"  h="full" onPress={()=> deleteText()}>Cancel</Button>}*/ 
            onPress={() => console.log("hi")} 
          />
         
          <FlatList h={650}
          data={filtered.slice(0,15)} keyExtractor={(item, index) => index.toString()} renderItem={({item }) => 
            <Pressable
              onPress={()=> navigation.navigate('StockView', {symbol: item.symbol, name: item.name} )}
            >
              <Box 
                borderBottomWidth="1" 
                _dark={{borderColor: "gray.600"}} 
                borderColor="coolGray.200" 
                m
                pl="2" 
                pr="5" 
                py="2"
              >
              <HStack space={3} justifyContent="space-between">
                <VStack>
                  <Text
                    fontSize="xl"
                    _dark={{color: "warmGray.50"}} 
                    color="coolGray.800" bold>
                    {item.symbol}
                  </Text>
                  <Text 
                    fontSize="lg"
                    color="coolGray.600" 
                    _dark={{color: "warmGray.200"}}
                  >
                    {item.name}
                  </Text>
                </VStack>
                <Spacer />
                <Text fontSize="xs" _dark={{
                  color: "warmGray.50"
                }} color="coolGray.800" alignSelf="flex-start">
                  {""}
                </Text>
              </HStack>
            </Box>
          </Pressable>}
        />
       
        
        </Stack>
    </Box>
  )
}


const styles = StyleSheet.create({})
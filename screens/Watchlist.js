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
  Button,
  Box,
  IconButton,
  Icon,
  Flex,
  Divider,
  theme,
  Stack,
  AlertDialog,
  

  
  
} from "native-base";
import { useNavigation } from '@react-navigation/native';

import { StyleSheet } from "react-native";
import { ToggleDarkMode } from "../components/ToggleDarkMode";
import { Entypo, Ionicons, MaterialIcons } from "@native-base/icons";
import { render } from "react-dom";
import { useWatchlist } from "../components/WatchlistProvider";




export default function Watchlist() {
  
  const navigation = useNavigation();
  const [text, setText] = React.useState("")
  const tickers = require("../data/allstocks.json")
  const [filtered, setFiltered] = React.useState([...tickers])
  const { portfolioStocks, removeStock } = useWatchlist()

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  const [msg, setMsg] = React.useState('')

  function error(symbol){
    setMsg("Are you sure you want to remove " + symbol + "?")
    setIsOpen(!isOpen)
  }
  function deleteStock(symbol){
    removeStock(symbol)
    setIsOpen(!isOpen)
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
          <Heading size="xl">Watchlist</Heading>
          
          <FlatList data={portfolioStocks} h="650" keyExtractor={(item, index) => index.toString()} renderItem={({item }) => 
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
              <Center>
                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                  <AlertDialog.Content>
                    <AlertDialog.Header >{msg}</AlertDialog.Header>
                    
                    <AlertDialog.Footer>
                      <Button.Group space={2}>
                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                          Cancel
                        </Button>
                        <Button colorScheme="danger" onPress={()=>deleteStock(item.symbol)}>
                          Delete
                        </Button>
                      </Button.Group>
                    </AlertDialog.Footer>
                  </AlertDialog.Content>
                </AlertDialog>
              </Center>
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
                
                <IconButton icon={<Icon as={Ionicons} name="ios-trash-bin" _light="black" _dark="white" />} borderRadius="full" _icon={{
                    color: "red.500",
                    size: "md"
                  }}  _pressed={{
                    bg: "orange.600:alpha.20",
                  }} _ios={{
                    _icon: {
                      size: "2xl"
                    }}}
                    onPress={() => error(item.symbol)} 
                />
              </HStack>
            </Box>
          </Pressable>}
        />
        </Stack>
    </Box>
  )
}


const styles = StyleSheet.create({})
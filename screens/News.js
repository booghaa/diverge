import React, { useEffect, useState, component } from "react";
import {
    Text,
    Link,
    HStack,
    Center,
    Heading,
    ScrollView,
    Box,
    Spinner,
    AspectRatio,
    Image,
    Stack,
    Pressable,
    FlatList,
} from "native-base";
import { StyleSheet } from "react-native";
import * as WebBrowser from 'expo-web-browser';

import { Load } from "../components/Load";
import axios from "axios";
import { ToggleDarkMode } from "../components/ToggleDarkMode";
import { getMarketNews } from "../requests";


import { Entypo } from "@native-base/icons";
import { ListItemBase } from "react-native-elements/dist/list/ListItemBase";

export default function News() {
    
    const[news, setNews] = useState([])
    const[loading, setLoading] = useState(true)
    
    useEffect(() => {
        async function getNews(){
            const results = await getMarketNews()
            console.log(results.data)
            setNews(results.data)
            setLoading(false)
        }

        //getNews()
    }, [])
    const handleNewsItemPress = async (url) => {
        await WebBrowser.openBrowserAsync(url);
    }
    
    return (
        
        <Box
            _dark={{ bg: "blueGray.900" }}
            _light={{ bg: "blueGray.50" }}
            px={4}
            flex={1}
            paddingTop={10}
        >
        <ToggleDarkMode/>
        <Stack space={4}>
            <Heading size="xl">News</Heading>
        
        
            {!loading ?
            <FlatList data={news} keyExtractor={(item, index) => index.toString()} renderItem={({item }) => 
                <Pressable onPress={()=>handleNewsItemPress(item.news_url)}>
                    <Box alignItems="center" mb={10}>
                    <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700"
                    }} _web={{
                    shadow: 2,
                    borderWidth: 0
                    }} _light={{
                    backgroundColor: "gray.50"
                    }}>
                        <Box>
                        <AspectRatio w="100%" ratio={16 / 9}>
                            <Image source={{
                            uri: item.image_url
                        }} alt="image" />
                        </AspectRatio>
                        
                        </Box>
                        <Stack p="4" space={3}>
                        <Stack space={2}>
                            <Heading size="md" ml="-1">
                            {item.title}
                            </Heading>
                            <Text fontSize="xs" _light={{
                            color: "darkBlue.500"
                        }} _dark={{
                            color: "lightBlue.400"
                        }} fontWeight="500" ml="-0.5" mt="-1">
                            {item.source_name}
                            </Text>
                        </Stack>
                        <Text fontWeight="400">
                            {item.text}
                        </Text>
                        <HStack alignItems="center" space={4} justifyContent="space-between">
                            <HStack alignItems="center">
                            <Text color="coolGray.600" _dark={{
                            color: "warmGray.200"
                            }} fontWeight="400">
                                
                            </Text>
                            </HStack>
                        </HStack>
                        </Stack>
                    </Box>
                </Box>
                            
            </Pressable>
            }/> : <Load/>}
            </Stack>
        </Box>

        
    )
}







const styles = StyleSheet.create({})
import React, {useEffect, useState} from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Spinner,
  useColorMode,
  ScrollView,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Fab,
  ChevronUpIcon,
  IconButton,
  Icon,
  Flex,
  useTheme,
  useToast,
  View,
  Divider,
} from "native-base";
import { StyleSheet } from "react-native";
import { Load } from "../components/Load";
import { StockViewHeader } from "../components/ToggleDarkMode";
import { Entypo, AntDesign } from "@native-base/icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { defaultStocks } from "../requests";
import Chart from "../components/Chart";
import { useWatchlist } from "../components/WatchlistProvider";
import axios from "axios";


export default function StockView() {
  const route = useRoute()
  const { portfolioStocks, storeStock, removeStock, deletePortfolio} = useWatchlist();
  const name = route.params.name 
  const symbol = route.params.symbol
  const [stock, setStock] = useState([])
  const [stats, setStats] = useState([])
  const[predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const {colorMode} = useColorMode()
  const theme = useTheme()
  const toast = useToast()
  const toastIdRef = React.useRef();
  const[percentChange, setPercentChange] = useState(1)
  
  useEffect(() => {
    async function getStock(){
      const results = await defaultStocks(symbol)
      setStock(results)
      setStats(stats(results))
      console.log(results.prices[results.prices.length-1].value)
      setPercentChange(
        (((results.prices[results.prices.length-1].value 
          - results.prices[0].value)
          /results.prices[0].value)*100).toFixed(2)
      )
      //CALL FLASK APP HERE 
      
      const pred = await axios.get(`http://127.0.0.1:5000/gethist?quote=${symbol}`);
      console.log("charger")
      const predictionsData = pred.data.split(',');
      
      const current = new Date();
      setPredictions([
        {
          title: `${current.getMonth()+1}/${current.getDate()+1}/${current.getFullYear()}`,
          description: Math.round(predictionsData[0] * 100) / 100 
        },
        {
          title: `${current.getMonth()+1}/${current.getDate()+2}/${current.getFullYear()}`,
          description: Math.round(predictionsData[1] * 100) / 100 
        },
        {
          title: `${current.getMonth()+1}/${current.getDate()+3}/${current.getFullYear()}`,
          description: Math.round(predictionsData[2] * 100) / 100 
        },
        {
          title: `${current.getMonth()+1}/${current.getDate()+4}/${current.getFullYear()}`,
          description: Math.round(predictionsData[3] * 100) / 100 
        },
        {
          title: `${current.getMonth()+1}/${current.getDate()+5}/${current.getFullYear()}`,
          description: Math.round(predictionsData[4] * 100) / 100 
        },
        {
          title: `${current.getMonth()+1}/${current.getDate()+6}/${current.getFullYear()}`,
          description: Math.round(predictionsData[5] * 100) / 100 
        },
        {
          title: `${current.getMonth()+1}/${current.getDate()+7}/${current.getFullYear()}`,
          description: Math.round(predictionsData[6] * 100) / 100 
        },
      ])
      

      setLoading(false)

    }
    function stats (stock) {
      function convertToInternationalCurrencySystem(labelValue) {
        return Math.abs(Number(labelValue)) >= 1.0e12
          ? (Math.abs(Number(labelValue)) / 1.0e12).toFixed(2) + "T"
          : 
          Math.abs(Number(labelValue)) >= 1.0e9
          ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
          : 
          Math.abs(Number(labelValue)) >= 1.0e6
          ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
          :
          Math.abs(Number(labelValue)) >= 1.0e3
          ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
          : Math.abs(Number(labelValue));
      }
      return [
      {
        title: "Mkt Cap",
        description:
          stock.companyOverview.MarketCapitalization ? 
          convertToInternationalCurrencySystem(
          stock.companyOverview.MarketCapitalization
          ) :
          "--"
        },
        {
        title: "Open",
        description: stock.open ? stock.open : "--",
        },
        {
        title: "EPS",
        description: stock.companyOverview.EPS ? stock.companyOverview.EPS : "--",
        },
        {
        title: "P/E ratio",
        description: 
          stock.companyOverview.TrailingPE ?
          stock.companyOverview.TrailingPE :
          "--"
        },
        {
        title: "52wk high",
        description: 
          stock.companyOverview["52WeekHigh"] ? 
          stock.companyOverview["52WeekHigh"] :
          "--"
        },
        {
        title: "52wk low",
        description: 
          stock.companyOverview["52WeekLow"] ?
          stock.companyOverview["52WeekLow"] :
          "--"
      }];
      
    }
    getStock()
  }, [])

  
  
  function addToPortfolio(){
    
    if (portfolioStocks.some((element) => element.symbol === symbol)) {
			toastIdRef.current = toast.show({
        render: () => {
          return (
            <Box 
              _dark={{bg: "red.700"}}
              _light={{bg: "red.400"}}
              px={2} 
              py={2} 
              rounded="md" 
            >
              <Text _light="white" fontSize="md" _dark="white">already added 🤦</Text>
            </Box>
          )
        }
      })
      setTimeout(function(){
        toast.close(toastIdRef.current)
      }, 1500);
		}
    else{
      storeStock({symbol, name})
      toastIdRef.current = toast.show({
        render: () => {
          return (
            <Box 
              _dark={{bg: {linearGradient: {
                colors: ["#69ff8a", "lightBlue.700"],
                start: [1, 0],
                end: [0, 0]
              }}}}
              _light={{bg: {linearGradient: {
                colors: ["green.300", "darkBlue.300"],
                start: [1, 0],
                end: [0, 0]
              }}}}
              px={2} 
              py={2} 
              rounded="md" 
            >
              <Text _light="white" fontSize="md" _dark="white">added to watchlist 🥶</Text>
            </Box>
          )
        }
      })
      setTimeout(function(){
        toast.close(toastIdRef.current)
      }, 1000);
    }
  }
  return (
    
    <Box
        _dark={{ bg:"blueGray.900"}}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
        paddingTop={10}
        
        
    >
      <StockViewHeader name={name}/>
      <Fab 
          renderInPortal={false} 
          shadow={10} 
          p={2}
          mr={2}
          mb={2}
          onPress={()=> addToPortfolio()}
          _dark={{bg: 'lightBlue.300'}}
          _light={{bg: 'darkBlue.700'}}
          icon={<Icon _dark={{color: 'black'}} _light={{color: 'white'}}as={AntDesign} 
          name="plus" 
          size="lg" />} 
        />
      <ScrollView>

      
        
        {!loading ?
          <VStack space={5}>
            <HStack justifyContent={"space-between"}>
              <VStack space={1}>
                <Heading size="2xl" >{symbol}</Heading>
                <Text fontSize="xl">{name}</Text>
              </VStack>
              <Center>
                <VStack>
                  <Text bold fontSize="2xl">${stock.currentPrice}</Text>
                  <HStack justifyContent={"flex-end"}>
                    <Center>
                      <Entypo 
                        name={percentChange > 0 ? "chevron-up" : "chevron-down"} 
                        size={25} 
                        color= {colorMode === "light" ? 
                        (percentChange > 0 ? theme.colors.green[800] 
                        : theme.colors.red[800] ) : (percentChange > 0 ? theme.colors.green[400] 
                        : theme.colors.red[400])}/>
                    </Center>
                    <Text 
                    _dark={{color: percentChange > 0 ? "green.200" : "red.200"}} 
                    _light={{color: percentChange > 0 ? "green.700" : "red.700"}} 
                    bold fontSize="xl">
                      {percentChange}%
                    </Text>
                  </HStack>
                </VStack>
              </Center>
            </HStack> 
            

            
              <Chart chartFigures={stock.prices} percentChange={percentChange}/>
              <Heading size="2xl" >Stats</Heading>
              <View
                style={{
                flexWrap: "wrap",
                flexDirection: "row",
                marginTop: 12,
                }}
              >
                {stats.map((stat, index) => {
                  const { title, description } = stat;
                  return (
                    <View key={index}>
                      <Box
                        style={{
                        height: 50,
                        width: 170,
                        margin: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "stretch",
                        }}
                      >
                        <Text _light={{color:"blueGray.500"}} _dark={{color:"blueGray.500"}}fontSize="lg">{title}</Text>
                        
                        <Text fontSize="lg"bold>{description}</Text>
                      </Box>
                    </View>
                  );
                  })}
              </View>
              <Heading size="2xl" >Predictions</Heading>
              <View
                style={{
                flexWrap: "wrap",
                flexDirection: "row",
                marginTop: 12,
                }}
              >
                {predictions.map((stat, index) => {
                  const { title, description } = stat;
                  return (
                    <View key={index}>
                      <Box
                        style={{
                        height: 50,
                        width: 170,
                        margin: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "stretch",
                        }}
                      >
                        <Text _light={{color:"blueGray.500"}} _dark={{color:"blueGray.500"}}fontSize="lg">{title}</Text>
                        <Text fontSize="lg"bold>{description}</Text>
                      </Box>
                    </View>
                  );
                  })}
              </View>
              <Heading size="2xl" >About</Heading>
              <Text fontSize={"lg"}>{stock.companyOverview.Description || "No description"}</Text>
            
          </VStack>
          : <Load/> }
        </ScrollView>
    </Box> 
  )
}

function StatsIcons(){
  return(
    <ScrollView horizontal style={{ marginTop: 8, paddingVertical: 8 }}>
				<Chip
				type="outline"
				containerStyle={{}}
				buttonStyle={{
					minWidth: 50,
					minHeight: 40,
					borderRadius: 50,
				}}
				title={companyOverview.Sector}
				titleStyle={myTextStyles.subTextBlack}
				icon={{
					name: "rocket",
					type: "font-awesome",
					size: 16,
					color: "#151515",
				}}
				iconLeft
				/>
				<Chip
				type="outline"
				containerStyle={{ marginLeft: 8 }}
				buttonStyle={{
					minWidth: 50,
					minHeight: 40,
					borderRadius: 50,
				}}
				title="3000 "
				titleStyle={myTextStyles.subTextBlack}
				icon={{
					name: "heartbeat",
					type: "font-awesome",
					size: 16,
					color: "#151515",
				}}
				iconLeft
				/>
				<Chip
				type="outline"
				containerStyle={{ marginLeft: 8 }}
				buttonStyle={{
					minWidth: 50,
					minHeight: 40,
					borderRadius: 50,
				}}
				title={companyOverview.Country}
				titleStyle={myTextStyles.subTextBlack}
				icon={{
					name: "compass",
					type: "font-awesome",
					size: 16,
					color: "#151515",
				}}
				iconLeft
				/>
			</ScrollView>
  )
}


const styles = StyleSheet.create({})
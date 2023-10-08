import React, { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const WatchlistContext = createContext();
export const useWatchlist = () => useContext(WatchlistContext);
const WatchlistProvider = ({children}) => {
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const[news, setNews] = useState([])
  useEffect(() => {
    getPortfolioData()
  },[])

  const getPortfolioData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@portfolio_stocks");
      setPortfolioStocks(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.log(e)
    }
  }
  const getNews = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@news");
      setNews(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.log(e)
    }
  }
  const deletePortfolio = async () => {
    try {
      await AsyncStorage.removeItem("@portfolio_stocks");
      setPortfolioStocks([]);
    } catch (e) {
      console.log(e)
    }
  }
  const storeStock = async (stock) => {
    try {
      const newWatchlist = [...portfolioStocks, stock];
      const jsonValue = JSON.stringify(newWatchlist);
      await AsyncStorage.setItem('@portfolio_stocks', jsonValue);
      setPortfolioStocks(newWatchlist);
    } catch (e) {
      console.log(e)
    }
  }
  async function storeNews(){
    try {
      
      const jsonValue = JSON.stringify(news);
      await AsyncStorage.setItem('@news', jsonValue);
      setNews(news);
    } catch (e) {
      console.log(e)
    }
  }

  const removeStock = async (symbol) => {
    const newWatchlist = portfolioStocks.filter((stockValue) => stockValue.symbol != symbol);
    const jsonValue = JSON.stringify(newWatchlist);
    await AsyncStorage.setItem('@portfolio_stocks', jsonValue);
    setPortfolioStocks(newWatchlist);
  }
  return (
    <WatchlistContext.Provider value={{
      portfolioStocks, storeStock, removeStock, deletePortfolio, news
    }}>
      {children}
    </WatchlistContext.Provider>
  )
}
export default WatchlistProvider;
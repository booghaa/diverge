import axios from "axios";

const alpha = require("alphavantage")({ key: `EUIY8ECEM4DJSHYU` });
import { sub } from "date-fns";
export const defaultStocks = async (ticker) => {
  try {
    
    if(ticker != undefined){
      const request = await singleStockInfo(ticker);
      return request;
    }
    const request1 = await singleStockInfo("AAPL");
    const request2 = await singleStockInfo("TSLA");
    const request3 = await singleStockInfo("GOOG");
    const request4 = await singleStockInfo("GME");
    const request5 = await singleStockInfo("AMZN");
    const request6 = await singleStockInfo("NFLX");
    
    const stockArr = [
      request1, request2, request3, request4, request5, request6,
    ];
    
    return stockArr;
  } catch (e) {
    console.log(e);
  }
}

function dateToTime(date){
  const newStr = date.replaceAll(/\D/g, '');
  const year = parseFloat(newStr.substring(0,4))
  const month = parseFloat(newStr.substring(4,6))
  const day = parseFloat(newStr.substring(6,8))
  const hour = parseFloat(newStr.substring(8,10))
  const minute = parseFloat(newStr.substring(10,12))
  const second = parseFloat(newStr.substring(12,14))
  let birthday = new Date(year,month,day,hour,minute,second)
  return birthday.getTime();
}
export const singleStockInfo = async (Symbol) => {
  console.log(`bob requested ${Symbol}`);
  try {
    const companyIntraday = await alpha.data.intraday(
      Symbol,
      null,
      null,
      "5min"
    );
    const pricesObject = companyIntraday["Time Series (5min)"];
    const prices = []; 
    const keys = Object.keys(pricesObject)
    let time = 0
    for(let i = 0; i < keys.length; i++){
  	  const innerKeys = Object.keys(pricesObject[keys[i]]);
    
      prices.push({
        "timestamp" : keys[i],
        "value": parseFloat(pricesObject[keys[i]]["1. open"]),
      });
      time+=5
    } 
    prices.reverse();

    const companyQuote = await alpha.data.quote(Symbol);
    const companyOverviewRequest = await axios.get(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${Symbol}&apikey=EUIY8ECEM4DJSHYU`
    );
    const companyOverview = await companyOverviewRequest.data;
  
    const stockObj = {
      symbol: companyQuote["Global Quote"]["01. symbol"],
      currentPrice: parseFloat(companyQuote["Global Quote"]["05. price"]).toFixed(2),
      percentChange: parseFloat(companyQuote["Global Quote"]["10. change percent"]).toFixed(2),
      open: companyQuote["Global Quote"]["02. open"],
      companyOverview: companyOverview,
      prices, //all prices, array
    };
    
    return stockObj;
  } catch (e) {
    console.log(e);
    
  }
}

export const getMarketNews = async () => {
  
  try{
      const results = await axios.get("https://stocknewsapi.com/api/v1/category?section=general&items=50&page=1&token=mfjijrfl5xfdnydq8f4epvoftovywaytfieqwh4w")
      return results.data; 
  }   
  catch (e) {
      console.log(e); 
  }
}




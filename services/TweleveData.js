import axios from "axios";
const options = {
    method: "GET",
    url: "https://twelve-data1.p.rapidapi.com/stocks",
    params: {
      country: "india",
      format: "json",
    },
    headers: {
      "X-RapidAPI-Key": "157ecc9b3dmshc8af2fe46381ea5p1ce1eajsn78eb5caafb76",
      "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
    },
  };

export const getStockData = () => axios.request(options);  
export const getPrice = (stocksymbol) => axios.request({
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/price',
  params: {
    symbol: stocksymbol,
    format: 'json',
    outputsize: '30'
  },
  headers: {
    'X-RapidAPI-Key': '157ecc9b3dmshc8af2fe46381ea5p1ce1eajsn78eb5caafb76',
    'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
  }
})
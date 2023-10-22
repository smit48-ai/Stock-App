import axios from "axios";

export const getStockData = () =>
  axios.request({
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
});


export const getSearchList=(symbol)=>axios.request({
  method: "GET",
  url: "https://twelve-data1.p.rapidapi.com/symbol_search",
  params: {
    symbol: symbol,
    outputsize: "30",
  },
  headers: {
    "X-RapidAPI-Key": "157ecc9b3dmshc8af2fe46381ea5p1ce1eajsn78eb5caafb76",
    "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
  },
})

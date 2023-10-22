import axios from "axios";

const options = {
    method: 'GET',
    url: 'https://latest-stock-price.p.rapidapi.com/any',
    headers: {
      'X-RapidAPI-Key': '157ecc9b3dmshc8af2fe46381ea5p1ce1eajsn78eb5caafb76',
      'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
    }
  };
  

export const getStockData = () => axios.request(options);  
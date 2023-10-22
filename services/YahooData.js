import axios from "axios";
import qs from 'qs';

export const getPrice = (add) => axios.request({
    method: "GET",
    url: "https://query1.finance.yahoo.com/v7/finance/options/"+add,
    params: {
       modules:"financialData",
    }
}); 




export const getChartData = (name,interval,range) =>{ 
    if(range==='1d')interval='1h';
    else if(range==='1mo')interval='1d';
    else if(range=='1y')interval='1mo'
    return axios.request({
    method: "GET",
    url: "https://query1.finance.yahoo.com/v8/finance/chart/"+name,
    params: {
       region:"US",
       lang:"en-US",
       includePrePost:"flase",
       interval:interval,
       range:range,
       corsDomain:"finance.yahoo.com",
       tsrc:"financed",
       modules:"financialData",
    }
});
}

export const getBasicInfo = (name) =>{
    // console.log(name);
    return axios.request({
   
    method: "GET",
    url: "https://query1.finance.yahoo.com/v6/finance/quoteSummary/"+name+"?modules=financialData&modules=quoteType&modules=defaultKeyStatistics&modules=assetProfile&modules=summaryDetail&&modules=netSharePurchaseActivity&ssl=true",
})
};
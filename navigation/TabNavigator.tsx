import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomesScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import StackNavigation from "./StackNavigation";
import {useState, useEffect} from "react";
import { getSearchList, getStockData } from "../services/TweleveData";
import { getPrice } from "../services/YahooData";
import MainStackNavigation from "../navigation/MainStackNavigation";
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const [listofStocks, setlistofStocks] = useState<Array<any>>([]);
  const [AllStocks, setAllStocks] = useState<Array<any>>([]);
  const [topGainers,setTopGainers]=useState<Array<any>>([]);
  const [topLossers,setTopLossers]=useState<Array<any>>([]);
  useEffect(() => {
    const apiCall = async () => {
      const res = await getStockData();
      setlistofStocks(res.data.data);
    };
    apiCall();
  }, []);

  useEffect(() => {
    var tempArr:any=[];
      const apiCall = async (add: any) => {
        const res = await getPrice(add);
        tempArr.push(res.data.optionChain.result[0]?.quote);
      };
      new Promise(async(resolve,reject)=>{
        for (var i = 0; i < Math.min(listofStocks.length,200); i++) {
          var stock = listofStocks[i];
          var add;
          if (stock.exchange === "BSE") add = stock.symbol + ".BO";
          else add = stock.symbol + ".NS";
          await apiCall(add);
        }
        resolve("done");
      }).then(()=>{
        setAllStocks(tempArr);
      },()=>{
        setAllStocks([]);
      })
     
  }, [listofStocks]);
  function compare(a:any, b:any ) {
    if ( a.regularMarketChangePercent < b.regularMarketChangePercent){
      return -1;
    }
    if ( a.regularMarketChangePercent > b.regularMarketChangePercent){
      return 1;
    }
    return 0;
  }

  useEffect(()=>{
    let Gainers=AllStocks.filter((stock)=>{
      return stock?.regularMarketChangePercent>0
    });
    Gainers.sort(compare);
    Gainers.reverse();
    let topGainers=[];
    for(var i=0; i<Math.min(10,Gainers.length); i++){
      topGainers.push(Gainers[i]);
    }
    setTopGainers(topGainers);
    let Lossers=AllStocks.filter((stock)=>{
      return stock?.regularMarketChangePercent<0
    });
    Lossers.sort(compare);
    // Lossers.reverse();
    let topLossers=[];
    for(var i=0; i<Math.min(10,Lossers.length); i++){
      topLossers.push(Lossers[i]);
    }
    setTopLossers(topLossers);

  },[AllStocks])

  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#4f46e5",
          tabBarShowLabel: false,
          tabBarStyle: {
            paddingBottom: 10,
            paddingTop: 10,
            height: 60,
          },
          tabBarInactiveTintColor: "black",
        }}
      >
        {/* <Tab.Screen
          name="Home"
          children={()=>{
            return <HomeScreen topGainers={topGainers} topLossers={topLossers}/>
          }}
          options={{
            tabBarIcon: ({ color, size }): any => {
              return <Ionicons name={"ios-home"} color={color} size={size} />;
            },
          }}
        /> */}
         <Tab.Screen
          name="OtherStack"
          children={()=>{
            return <MainStackNavigation topGainers={topGainers} topLossers={topLossers}/>
          }}
          options={{
            tabBarIcon: ({ color, size }): any => {
              return <Ionicons name={"ios-home"} color={color} size={size} />;
            },
          }}
        />
        <Tab.Screen
          name="Stack"
          children={()=>{
            return <StackNavigation AllStocks={AllStocks}/>
          }}
          options={{
            tabBarIcon: ({ color, size }): any => {
              return (
                <Ionicons name={"ios-trending-up"} color={color} size={size} />
              );
            },
          }}
        />
      </Tab.Navigator>
  );
};

export default TabNavigation;

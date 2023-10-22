import * as React from "react";
import { useState, useEffect } from "react";
import { VStack, Heading, Text, Box, Input, ScrollView, Center} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import ListItem from "../components/ListItem";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import StockScreen from "./StockScreen";
import { getSearchList, getStockData } from "../services/TweleveData";
import { getPrice } from "../services/YahooData";
import {Alert, Modal, StyleSheet, Pressable, View} from 'react-native';
import { windowWidth,windowHeight } from "../utils/Dimensions";
import { Searchbar } from "react-native-paper";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';  
import colors from "native-base/lib/typescript/theme/base/colors";
import theme from "../theme/LightTheme";


//TODO: currently only indian 100
//TODO: change to fectch as you scroll (Lazy)
//TODO: Filter the data as some of stock data missing ig
//TODO: Remove the Mutual funds

const Stack = createStackNavigator();

function MarketScreen({AllStocks}:any): JSX.Element {
  // const [listofStocks, setlistofStocks] = useState<Array<any>>([]);
  // const [AllStocks, setAllStocks] = useState<Array<any>>([]);
  // const [modalVisible, setModalVisible]=useState<any>(false);
  console.log(AllStocks);
  
  const [searchSymbol,setsearchSymbol]=useState<any>("");
  const [stockData, setstockData]=useState<any>([]);
  const [SearchList, setSearchList] = useState<any>([]);

  // const handleSearch = ()=>{
  //     setModalVisible(!modalVisible);
  // }

  // useEffect(() => {
  //   const apiCall = async () => {
  //     const res = await getStockData();
  //     setlistofStocks(res.data.data);
  //   };
  //   apiCall();
  // }, []);

  useEffect(()=>{
    // console.log(SearchList);
    var tempArr:any=[];
    const apiCall = async (add: any) => {
      const res = await getPrice(add);
      tempArr.push(res.data.optionChain.result[0]?.quote);
    };
    new Promise(async(resolve,reject)=>{
      for (var i = 0; i <SearchList.length; i++) {
        var stock = SearchList[i];
        var add;
        if (stock.exchange === "BSE") add = stock.symbol + ".BO";
        else add = stock.symbol + ".NS";
        await apiCall(add);
      }
      resolve("done");
    }).then(()=>{
      setstockData(tempArr);
    },()=>{
      setstockData([]);
    })
  
  },[SearchList])

  useEffect(()=>{
    // console.log(SearchList);
    const apicall = async () => {
      const res = await getSearchList(searchSymbol);
      setSearchList(res.data.data);
    };
    
    if(searchSymbol!==""){
      apicall();
    }
  
  },[searchSymbol])

  // useEffect(() => {
  //   var tempArr:any=[];
  //     const apiCall = async (add: any) => {
  //       const res = await getPrice(add);
  //       tempArr.push(res.data.optionChain.result[0]?.quote);
  //     };
  //     new Promise(async(resolve,reject)=>{
  //       for (var i = 0; i < Math.min(listofStocks.length,200); i++) {
  //         var stock = listofStocks[i];
  //         var add;
  //         if (stock.exchange === "BSE") add = stock.symbol + ".BO";
  //         else add = stock.symbol + ".NS";
  //         await apiCall(add);
  //       }
  //       resolve("done");
  //     }).then(()=>{
  //       setAllStocks(tempArr);
  //     },()=>{
  //       setAllStocks([]);
  //     })
     
  // }, [listofStocks]);

  return (
    <VStack p="4" pt="20" bgColor="white" minHeight="100%">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="baseline"
      >
        <Heading size="2xl">
          <Text color="indigo.500">Market</Text>
        </Heading>
        {/* <Pressable onPress={handleSearch}>
        <Ionicons
          name="ios-search"
          style={{ fontSize: 25, marginBottom: 0 }}
        ></Ionicons>
        </Pressable> */}
      </Box>
      <Box mt="4">
      <Searchbar
        placeholder="Search"
        onChangeText={(text)=>{
          setsearchSymbol(text)
        }}
        value={searchSymbol}
      />
      </Box>{
        searchSymbol===""?
      AllStocks.length ? (
          <ScrollView mt="3">
            {AllStocks.map((stock: any): JSX.Element => {
              if(stock?.symbol){
                return <ListItem stock={{ ...stock }} isDivider={true} key={stock.symbol} />;
              }
              else{
                return <></>
              }
              
            })}
          </ScrollView>
        ) : (
          <Center h="80%">
              <ActivityIndicator color={theme.colors.color2} size="large"></ActivityIndicator>
          </Center>
          
        ):
        stockData.length ? (
          <ScrollView mt="3">
            {stockData.map((stock: any): JSX.Element => {
              if(stock?.symbol){
                return <ListItem stock={{ ...stock }} isDivider={true} />;
              }
              else{
                return <></>
              }
              
            })}
          </ScrollView>
        ) : (
          <Center h="80%">
              <ActivityIndicator color={theme.colors.color2} size="large"></ActivityIndicator>
          </Center>
          
        )

      }
     
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
        
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
    </VStack>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  modalView: {
    margin: 20,
    width: windowWidth,
    height: windowHeight*0.8,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default MarketScreen;

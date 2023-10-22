import * as React from "react";
import { VStack, Heading, Box, Text, Input, ScrollView } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { LineChart } from "react-native-gifted-charts";
import { getBasicInfo, getChartData } from "../services/YahooData";
import ScrollingChartWithPointer from "../components/Chart";
import { Searchbar, Button, Divider } from "react-native-paper";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Surface } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { log } from "console";
import { background } from "native-base/lib/typescript/theme/styled-system";
import { windowWidth } from "../utils/Dimensions";
import { List } from "react-native-paper";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseconfig";
import { doc, setDoc, collection, where, query, getDocs } from "firebase/firestore";
const auth = FIREBASE_AUTH;
const store = FIRESTORE_DB;

//TODO: handle the save button for watchlist
//TODO: Add about with drop down

function StockScreen({ navigation, route }: any): JSX.Element {
  const [ChartData, setChartData] = useState<any>(null);
  const [Interval, setInterval] = useState<any>("1d");
  const [BasicInfo, setBasicInfo] = useState<any>({});
  const [userData, setuserData] = useState<any>({});

  useEffect(() => {
    const apicall = async () => {
      const q = query(
        collection(store, "UsersData"),
        where("id", "==", auth.currentUser?.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setuserData(doc.data());
      });
    };
    apicall();

  }, [auth.currentUser]);

  // const handleSave = async () => {
  //   console.log("button pressed");
    
  //   const q = query(
  //     collection(store, "UsersData"),
  //     where("id", "==", auth.currentUser?.uid)
  //   );
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach(async (doc) => {
  //     console.log(doc.data());
      
  //     await setDoc(doc.ref, {
  //      ...doc.data(),
  //      watchlist:[...doc.data().watchlist,route.params?.symbol]
  //     });
  //   });
  //   // console.log(querySnapshot[0]?.data());
  //   const q2 = query(
  //     collection(store, "UsersData"),
  //     where("id", "==", auth.currentUser?.uid)
  //   );
  //   const querySnapshot2 = await getDocs(q);
  //   querySnapshot2.forEach(async (doc) => {
  //     console.log(doc.data());
  //   });
   
  // };
  useEffect(() => {
    console.log("called");
    
    console.log(route.params?.symbol); 
    const apicall = async () => {
      const res = await getBasicInfo(route.params?.symbol);
      setBasicInfo(res.data.quoteSummary.result[0]);
      // console.log("thiese valuable");
      
      // console.log(res.data.quoteSummary.result[0]);
      
    };
    apicall();
  }, [route.parms?.symbol]);

  useEffect(() => {
    const apicall = async () => {
      const res = await getChartData(route.params?.symbol, "1m", Interval);
      setChartData(res.data.chart.result[0]);
    };
    apicall(); 
  }, [Interval]);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "undefined",
        },
      });
  }, []);

  return (
    <VStack p="4" pt="20" bgColor="white" minHeight="100%">
      <Box mb="4">
        <Ionicons
          name="ios-arrow-back-circle-outline"
          style={{ fontSize: 25, marginBottom: 0 }}
          onPress={() => {
            navigation.goBack();
          }}
        ></Ionicons>
      </Box>
      <ScrollView>
        <Box>
          <Heading size="2xl">
            <Text color="indigo.500">
              {route.params?.symbol?.split(".")[0]}
            </Text>
          </Heading>
          <Heading size="1xl">
            <Text color="indigo.500">{BasicInfo?.quoteType?.shortName}</Text>
          </Heading>
        </Box>
        <Box>
          {ChartData ? (
            <ScrollingChartWithPointer ChartData={ChartData} />
          ) : (
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
          )}
          {/* <ScrollingChartWithPointer /> */}
        </Box>
        <Box mt="6" flexDirection="row" justifyContent={"center"}>
          <Button
            mode={Interval === "1h" ? "contained" : "text"}
            buttonColor={Interval === "1h" ? "black" : "white"}
            textColor={Interval === "1h" ? "white" : "black"}
            onPress={() => setInterval("1h")}
          >
            1H
          </Button>
          <Button
            mode={Interval === "1d" ? "contained" : "text"}
            buttonColor={Interval === "1d" ? "black" : "white"}
            textColor={Interval === "1d" ? "white" : "black"}
            onPress={() => setInterval("1d")}
          >
            1D
          </Button>
          <Button
            mode={Interval === "1mo" ? "contained" : "text"}
            buttonColor={Interval === "1mo" ? "black" : "white"}
            textColor={Interval === "1mo" ? "white" : "black"}
            onPress={() => setInterval("1mo")}
          >
            1M
          </Button>
          <Button
            mode={Interval === "1y" ? "contained" : "text"}
            buttonColor={Interval === "1y" ? "black" : "white"}
            textColor={Interval === "1y" ? "white" : "black"}
            onPress={() => setInterval("1y")}
          >
            1Y
          </Button>
        </Box>
        <Box mt="6" flexDirection="column">
          <Heading mb="2" size="lg" bold>
            Market stats
          </Heading>
          <Box m="3" flexDirection={"row"} justifyContent={"space-between"}>
            <Text fontSize="lg">Market Cap</Text>
            <Text fontSize="lg">{BasicInfo?.summaryDetail?.marketCap.fmt}</Text>
          </Box>
          <Divider></Divider>
          <Box m="3" flexDirection={"row"} justifyContent={"space-between"}>
            <Text fontSize="lg">Volume</Text>
            <Text fontSize="lg">{BasicInfo?.summaryDetail?.volume.fmt}</Text>
          </Box>
          <Divider></Divider>
          <Box m="3" flexDirection={"row"} justifyContent={"space-between"}>
            <Text fontSize="lg">Total Insider Shares</Text>
            <Text fontSize="lg">
              {BasicInfo?.netSharePurchaseActivity?.totalInsiderShares.fmt}
            </Text>
          </Box>
          <Divider></Divider>
        </Box>

        {/* <List.Accordion title="About" id="1" rippleColor={'gray'}>
      <Text>{}</Text>
    </List.Accordion> */}
      </ScrollView>
      {/* <Box bg="white" safeAreaTop width="100%" maxW="300px" alignSelf="center">
        <Button
          mode="contained"
          buttonColor="black" 
          onPress={() => handleSave()}
        > */}
          {/* {userData.watchList.includes(route.params?.symbol)? "save" : "unsave"} */}
        {/* </Button>
      </Box> */}
    </VStack>
  );
}

export default StockScreen;

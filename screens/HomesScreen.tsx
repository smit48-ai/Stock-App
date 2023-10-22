import * as React from "react";
import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { VStack, Heading, Text, Box, Input, ScrollView, Skeleton } from "native-base";
import { getStockData } from "../services/TweleveData";
import { getPrice } from "../services/YahooData";
import InfoBox from "../components/InfoBox";
import { Avatar} from "native-base";
import { Button } from "react-native-paper";
import { signOut } from "firebase/auth";
import { addDoc, collection, queryEqual } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseconfig";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useContext } from "react";
import { where, getDocs, doc, query } from "firebase/firestore";
import { QueryDocumentSnapshot } from "firebase/firestore";
import WatchList from "../components/WatchList";
import theme from "../theme/LightTheme";
import colors from "native-base/lib/typescript/theme/base/colors";

const auth = FIREBASE_AUTH;
const store = FIRESTORE_DB;

function HomeScreen({topGainers, topLossers}:any): JSX.Element {
  const [userData, setuserData] = useState<any>({});
  const [watchList,setwatchList] = useState<any>([]);
  const usersCollection = collection(store, "UsersData");

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

  useEffect(() => {
    var tempArr:any=[];
    const apiCall = async (add: any) => {
      const res = await getPrice(add);
      tempArr.push(res.data.optionChain.result[0]?.quote);
    };
    new Promise(async(resolve,reject)=>{
      for (var i = 0; i < userData.watchList?.length; i++) {
        var stock = userData.watchList[i];
        await apiCall(stock);
      }
      resolve("done");
    }).then(()=>{
      setwatchList(tempArr);
    },()=>{
      setwatchList([]);
    })

  }, [userData]);

  const Logout = async () => {
    await signOut(auth);
  };


  //Logic Expired
  // useEffect(() => {
  //   const apicall = async ()=>{
  //     const res = await getStockData();
  //     // console.log(res.data.data);
  //     let data=res.data.data;
  //     console.log(data.length);

  //     for(let i=0; i<data.length; i++){
  //       try{
  //         const add=data[i].symbol + (data[i].exchange==="BSE"?".BO":".NS");
  //         console.log(add);
  //         const res2= await getPrice(add);
  //         console.log(res2.data);
  //         data[i].price=res2.data.optionChain.result[0].quote.regularMarketPrice;
  //       }catch(error){
  //         console.log(error);
  //       }
  //     }
  //     setAllStock(data);
  //   }
  //   apicall();
  // }, []);

  return (
   
    <VStack p="4" pt="20" bgColor="white" minHeight="100%">
      <Box flexDirection="row" justifyContent="space-between">
        <Box>
          <Text color="indigo.500">Welcome user!!</Text>
          <Heading size="2xl">
            <Text color="indigo.500">Stock App</Text>
          </Heading>
        </Box>
      </Box>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} mb="50">
      <Box
        bg="indigo.700"
        mt="5"
        p="4"
        height="130"
        borderRadius="md"
        shadow="5"
        flexDirection="row"
      >
        <Avatar
          bg="indigo.500"
          source={{
            uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
          size="lg"
        ></Avatar>
        <Box flexDirection="column" ml="6">
          {userData.name?
          <>
          <Heading size="xl">
            {"name" in userData && (
             <Text color="white">{userData.name}</Text>
            ) }
          </Heading>
          <Text color="white" fontSize="lg">
            {auth.currentUser?.email}
          </Text>
          <Box></Box>
          <Button
            style={{marginTop:5}}
            mode="outlined"
            textColor={theme.colors.color2}
            buttonColor="white"
            onPress={() => {
              Logout();
            }}
          >
            Logout
          </Button></>:
          <ActivityIndicator color={"white"} size="large"></ActivityIndicator>

}
        </Box>
      </Box>
      {/* <InfoBox title="Watchlists"  list={watchList}/> */}
      {/* <WatchList watchList={watchList}/> */}
      <InfoBox title="Top Gainers" list={topGainers} />
      <InfoBox title="Top lossers" list={topLossers} />
      </ScrollView>
    </VStack>
    
  );
}

export default HomeScreen;

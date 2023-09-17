import * as React from "react";
import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { VStack, Heading, Text, Box, Input, ScrollView } from "native-base";
import { getStockData } from "../services/TweleveData";

type StockType = {
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
  mic_code: string;
  country: string;
  type: string;
};

function SearchBar() {
  return (
    <VStack my="4" space={5} w="100%">
      <VStack w="100%" space={5} alignSelf="center">
        <Input
          placeholder="Search by Stock name"
          width="100%"
          borderRadius="4"
          borderColor="indigo.600"
          py="3"
          px="1"
          fontSize="lg"
        />
      </VStack>
    </VStack>
  );
}

function HomeScreen(): JSX.Element {
  const [AllStocks, setAllStock] = useState<Array<StockType>>([]);

  useEffect(() => {
    const apicall = async ()=>{
      const res = await getStockData();
      console.log(res.data.data);
      setAllStock(res.data.data);
    }
    apicall();
  }, []);

  useEffect(()=>{
    
  },[AllStocks])

  return (
    <VStack m="4" mt="20">
      <Text color="indigo.500">Welcome user!!</Text>
      <Heading size="2xl">
        <Text color="indigo.500">Stock App</Text>
      </Heading>
      <Box
        bg="indigo.700"
        mt="5"
        p="4"
        height="200"
        borderRadius="md"
        shadow="5"
      >
        <Heading size="xl">
          <Text color="white">Market</Text>
        </Heading>
        <Text color="white" fontSize="lg">
          Market is up By 20
        </Text>
      </Box>
      <SearchBar></SearchBar>
      {AllStocks.length ? (
        <ScrollView mt="4" h="300">
          <VStack shadow="1">
            {AllStocks.map((stock: StockType): JSX.Element => {
              return (
                <Box
                  p="4"
                  m="1"
                  borderWidth="1"
                  borderRadius="md"
                  borderColor="indigo.300"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Text fontSize="md">\u{stock.symbol}</Text>
                  <Text fontSize="md">{stock.name}</Text>
                  <Text fontSize="sm">{stock.currency}</Text>
                </Box>
              );
            })}
          </VStack>
        </ScrollView>
      ) : (
        <ActivityIndicator color="0"></ActivityIndicator>
      )}
    </VStack>
  );
}

export default HomeScreen;

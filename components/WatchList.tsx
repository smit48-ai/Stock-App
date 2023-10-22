import React from "react";
import { Heading, ScrollView, View, Text } from "native-base";
import { Box } from "native-base";

const WatchList = ({watchList}:any) => {
  return (
    <Box
      bg="lightgray"
      mt="5"
      p="4"
      height="200"
      borderRadius="md"
      backgroundColor={"lightgray"}
    //   borderWidth={"1"}
    >
          <Heading size="xl">
        <Text color="black">Watch List</Text>
      </Heading>
      <ScrollView horizontal>
        {
            watchList.map((item:any)=>{
                <Box
                bg="white"
                mt="5"
                p="4"
                height="100"
                borderRadius="md"
                backgroundColor={"lightgray"}
                borderWidth={"1"}
                flex="column"
              >
                <Heading>{item.symbol}</Heading>
                <Text fontSize="lg">{item.regularMarketPrice}</Text>
                {item.regularMarketChangePercent>=0?<Text fontSize="sm" style={{color:"green"}}>{item.regularMarketChangePercent}</Text>:<Text fontSize="sm"  style={{color:"red"}}>{item.regularMarketChangePercent}</Text>}
                </Box>
            })
        }
      </ScrollView>
    </Box>
  );
};

export default WatchList;

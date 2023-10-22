import * as React from "react";
import { VStack, Heading, Text, Box, Input, ScrollView, Divider} from "native-base";
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
const Stack = createStackNavigator();


//TODO: change the border to none and set proper shadow
//TODO: onpress has bad effect remove it

const ListItem = ({stock:{symbol,regularMarketPrice,regularMarketChangePercent},isDivider}:any)=>{
   const navigation = useNavigation<StackNavigationProp<any>>();  
    return (
      <>
       <TouchableOpacity onPress={()=>{
        navigation.navigate('Stock',{symbol:symbol})
      }}>
        <Box
        p="4"
        // borderRadius="md"
        // borderWidth="1"
        bgColor="white"
        flexDirection="row"
        justifyContent="space-between"
        alignItems='center'
        // shadow="3"
      >
        <Text fontSize="lg">{symbol?.split(".")[0]}</Text>
        <Box flexDirection="column" alignItems="flex-end">
        <Text fontSize="lg">{regularMarketPrice}</Text>
        {regularMarketChangePercent>=0?<Text fontSize="sm" style={{color:"green"}}>{regularMarketChangePercent}</Text>:<Text fontSize="sm"  style={{color:"red"}}>{regularMarketChangePercent}</Text>}
        </Box>
      </Box>
      </TouchableOpacity>
       {isDivider && <Divider/>}
      </>
     
    );
}

export default ListItem;
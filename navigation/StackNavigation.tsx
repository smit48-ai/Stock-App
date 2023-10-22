import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import StockScreen from "../screens/StockScreen";
import MarketScreen from "../screens/MarketScreen";
import * as React from "react";

const Stack = createStackNavigator();

const StackNavigation = ({AllStocks}:any) => {
  return (
    <Stack.Navigator
      initialRouteName="Market"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen
        name="Market"
        children={()=>{
          return <MarketScreen AllStocks={AllStocks}/>
        }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Stock"
        component={StockScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;

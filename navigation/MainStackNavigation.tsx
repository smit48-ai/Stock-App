import {
    createStackNavigator,
    TransitionPresets,
  } from "@react-navigation/stack";
  import { NavigationContainer, useRoute } from "@react-navigation/native";
  import StockScreen from "../screens/StockScreen";
  import MarketScreen from "../screens/MarketScreen";
  import * as React from "react";
import HomeScreen from "../screens/HomesScreen";
  
  const Stack = createStackNavigator();
  
  const MainStackNavigation = ({topGainers,topLossers}:any) => {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen
          name="Home"
          children={()=>{
            return <HomeScreen topGainers={topGainers} topLossers={topLossers}/>
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
  
  export default MainStackNavigation;
  
import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomesScreen";
import { Flex, NativeBaseProvider } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#4f46e5",
            tabBarShowLabel:false,
            tabBarStyle:{
              paddingBottom:10,
              paddingTop:10,
              height:60,
            },
            tabBarInactiveTintColor: "black",
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({color, size }): any => {
                return <Ionicons name={'ios-home'} color={color} size={size} />;
              },
            }}
          />
          <Tab.Screen
            name="Market"
            component={HomeScreen}
            options={{
              tabBarIcon: ({color, size }): any => {
                return <Ionicons name={'ios-trending-up'} color={color} size={size} />;
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

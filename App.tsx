import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import TabNavigation from "./navigation/TabNavigator";
import {TouchableRipple} from "react-native-paper";
import './disableYellowBox';

const Stack = createStackNavigator();

export default function App(): JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user: any) => {
      setUser(user);
      console.log(user);
    });
  }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
     
          
       
        <Stack.Navigator initialRouteName="Login">
          {user ? (
            <Stack.Screen
              name="Home"
              component={TabNavigation}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
        {/* <Tab.Navigator
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
            name="Stack"
            component={StackNavigation}
            options={{
              tabBarIcon: ({color, size }): any => {
                return <Ionicons name={'ios-trending-up'} color={color} size={size} />;
              },
            }}
          />
        </Tab.Navigator> */}
         {/* </TouchableRipple> */}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

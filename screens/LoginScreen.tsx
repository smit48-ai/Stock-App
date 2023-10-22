import * as React from "react";
import {Collapse,
  IconButton,
  CloseIcon, Alert, VStack, Heading, Text, Box, Input, Center, FormControl,Link, Button, HStack } from "native-base";
import { useState } from "react";
import { FIREBASE_AUTH } from "../firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ActivityIndicator } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const auth= FIREBASE_AUTH;

function LoginScreen({ navigation }:any):JSX.Element{
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [Data, setData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState(false);

  const validateEmail = (email: any) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


  const validateForm = () => {
    let errorObj = {};
    if (Data.email === "") {
      errorObj = { ...errorObj, email: "Enter Email" };
    } else {
      if (!validateEmail(Data.email))
        errorObj = { ...errorObj, email: "Enter valid emailId" };
    }
    if (Data.password === "") {
      errorObj = { ...errorObj, password: "Enter Password" };
    } 
    if (Object.entries(errorObj).length === 0) {
      setError(errorObj);
      signIn();
    } else {
      setError(errorObj);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        Data.email,
        Data.password
      );
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setAlert(true);

      // console.error(error);
    }
  };
    // const 
    return <Center w="100%" h="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }}>
            Welcome To StockApp
          </Heading>
          <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
            Sign in to continue!
          </Heading>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <VStack space={3} mt="5">
          <FormControl isInvalid={"email" in error}>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input
                value={Data.email}
                onChangeText={(value) => setData({ ...Data, email: value })}
              />
              {"email" in error && (
                <FormControl.ErrorMessage>
                  {error.email}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={"password" in error}>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                value={Data.password}
                onChangeText={(value) => setData({ ...Data, password: value })}
              />
              {"password" in error && (
                <FormControl.ErrorMessage>
                  {error.password}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            {Loading ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              <Button
                mt="2"
                colorScheme="indigo"
                onPress={() => {
                  validateForm();
                }}
              >
                Sign In
              </Button>
            )}
            <HStack mt="6" justifyContent="center">
              <Text fontSize="sm" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
                I'm a new user.{" "}
              </Text>
              <Link _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm"
            }} onPress={()=>{
              navigation.navigate('Signup')
            }}>
                Sign Up
              </Link>
            </HStack>
          </VStack>
          <Collapse isOpen={alert} mt="3">
            <Alert maxW="400" status="error">
              <VStack space={1} flexShrink={1} w="100%">
                <HStack
                  flexShrink={1}
                  space={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <HStack flexShrink={1} space={2} alignItems="center">
                    <Alert.Icon />
                    <Text
                      fontSize="md"
                      fontWeight="medium"
                      _dark={{
                        color: "coolGray.800",
                      }}
                    >
                      Please try again later!
                    </Text>
                  </HStack>
                  <IconButton
                    variant="unstyled"
                    _focus={{
                      borderWidth: 0,
                    }}
                    icon={<CloseIcon size="3" />}
                    _icon={{
                      color: "coolGray.600",
                    }}
                    onPress={() => {
                      setAlert(false);
                      setData({
                        email: "",
                        password: "",
                      });
                    }}
                  />
                </HStack>
                <Box
                  pl="6"
                  _dark={{
                    _text: {
                      color: "coolGray.600",
                    },
                  }}
                >
                  password or email is incorrect!!
                </Box>
              </VStack>
            </Alert>
          </Collapse>
          </KeyboardAwareScrollView>
        </Box>
      </Center>;
  };

  export default LoginScreen;
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  VStack,
  Heading,
  Text,
  Box,
  Input,
  Center,
  FormControl,
  Link,
  Button,
  HStack,
  KeyboardAvoidingView,
  Alert,
  AlertDialog,
  Collapse,
  IconButton,
  CloseIcon,
} from "native-base";
import { useState } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseconfig";
import { userInfo } from "os";
import { ScrollView } from "native-base";
import { ActivityIndicator } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { log } from "util";
const auth = FIREBASE_AUTH;
const store = FIRESTORE_DB;

function SignupScreen(): JSX.Element {
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const usersCollection = collection(store, "UsersData");
  const [alert, setAlert] = useState(false);
  const [Data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const validateEmail = (email: any) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password: any) => {
    var regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return String(password).toLowerCase().match(regularExpression);
  };

  const validateForm = () => {
    let errorObj = {};
    let done = 0;
    if (Data.username === "") {
      errorObj = { ...errorObj, username: "Enter Username" };
    }
    if (Data.email === "") {
      errorObj = { ...errorObj, email: "Enter Email" };
    } else {
      if (!validateEmail(Data.email))
        errorObj = { ...errorObj, email: "Enter valid emailId" };
    }
    if (Data.password === "") {
      errorObj = { ...errorObj, password: "Enter Password" };
    } else {
      if (!validatePassword(Data.password))
        errorObj = {
          ...errorObj,
          password:
            "Enter password with minimum 6 characters and maxium 16 characters with atleast one number and one special character",
        };
    }
    if (Data.password !== Data.confirm) {
      errorObj = { ...errorObj, confirm: "Passwords does not matches" };
    }
    if (Object.entries(errorObj).length === 0) {
      setError(errorObj);
      signUp();
    } else {
      setError(errorObj);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        Data.email,
        Data.password
      );
      await addDoc(usersCollection, {
        id: res.user.uid,
        name: Data.username,
      });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setAlert(true);
    }
  };
  return (
    <Center w="100%" h="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Welcome To StockApp
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <VStack space={3} mt="5">
            <FormControl isInvalid={"username" in error}>
              <FormControl.Label>Username</FormControl.Label>
              <Input
                value={Data.username}
                onChangeText={(value) => {
                  setData({ ...Data, username: value });
                  // setError({...Error, username:""})
                }}
              />
              {"username" in error && (
                <FormControl.ErrorMessage>
                  {error.username}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={"email" in error}>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                value={Data.email}
                onChangeText={(value) => {
                  setData({ ...Data, email: value });
                  // setError({ ...Error, email: "" });
                }}
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
                onChangeText={(value) => {setData({ ...Data, password: value });
              //  setError({...Error,password:""})
              }}
              />
              {"password" in error && (
                <FormControl.ErrorMessage>
                  {error.password}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={"confirm" in error}>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                type="password"
                value={Data.confirm}
                onChangeText={(value) => {setData({ ...Data, confirm: value })
              // setError({...Error,confirm:""})
            }}
              />
              {"confirm" in error && (
                <FormControl.ErrorMessage>
                  {error.confirm}
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
                Sign up
              </Button>
            )}
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
                        username: "",
                        email: "",
                        password: "",
                        confirm: "",
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
                  Email ID is already registered!!
                </Box>
              </VStack>
            </Alert>
          </Collapse>
        </KeyboardAwareScrollView>
      </Box>
    </Center>
  );
}

export default SignupScreen;

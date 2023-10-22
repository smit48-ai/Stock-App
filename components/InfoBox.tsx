import { Box, Heading, ScrollView, Text, Center } from "native-base";
import { ActivityIndicator } from "react-native-paper";
import ListItem from "./ListItem";
import theme from "../theme/LightTheme";

const InfoBox = ({ title, list }: any) => {
  console.log("Inside the");

  console.log(list);

  return (
    <Box
      bg="white"
      mt="5"
      p="4"
      height="300"
      borderRadius="md"
      borderColor={"lightgray"}
      borderWidth={"1"}
    >
      <Heading size="lg">
        <Text color="black">{title}</Text>
      </Heading>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        {list.length ? (
          list.map((item: any) => {
            return (
              <ListItem stock={item} isDivider={false} key={item.symbol}></ListItem>
            );
          })
        ) : (
          <Center h="100" mt="20">
            <ActivityIndicator
              color={theme.colors.color2}
              size="large"
            ></ActivityIndicator>
          </Center>
        )}
      </ScrollView>
    </Box>
  );
};

export default InfoBox;

import { VStack, Heading, Text, Box, Input, ScrollView } from "native-base";

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

  export default SearchBar;
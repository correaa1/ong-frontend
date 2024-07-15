import { ChakraProvider, Flex } from '@chakra-ui/react';
import SimpleSidebar from "../app/components/siderbar";
import theme from "../app/theme"
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Flex>
        <SimpleSidebar />
        <Flex direction="column" w="full">
          <Component {...pageProps} />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default MyApp;

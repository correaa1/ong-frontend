import { ChakraProvider, Flex } from '@chakra-ui/react';
import SimpleSidebar from "../app/components/siderbar";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
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

import { Flex, Spinner, Text } from '@chakra-ui/react';

const LoadingSpinner = ({ message = 'Carregando...' }) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="200px"
      gap={4}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Text color="gray.600" fontSize="lg">
        {message}
      </Text>
    </Flex>
  );
};

export default LoadingSpinner; 
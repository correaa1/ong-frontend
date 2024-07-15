import { useState, useEffect } from 'react';
import axios from 'axios';
import TableChakra from '@/app/components/TableChakra';
import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';

const Delivery = () => {
  const [deliveryList, setDeliveryList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  useEffect(() => {
    const fetchDeliveryList = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/delivery');
        const transformedData = response.data.map(delivery => ({
          ...delivery,
          userName: delivery.users.length > 0 ? delivery.users[0].name : 'N/A',
        }));
        setDeliveryList(transformedData);
      } catch (error) {
        console.error('Error fetching delivery list:', error);
      }
    };

    fetchDeliveryList();
  }, []);

  const deliveryColumns = [
    { label: 'Nome do Usuário', key: 'userName' },
    { label: 'Mês', key: 'month' },
  ];

  const handleRowClick = (delivery) => {
    setSelectedDelivery(delivery);
    onOpen();
  };

  return (
    <Box minH='57rem' bg='blue.50'>
      <Text mx='2rem' mt='2rem' fontWeight='bold' fontSize='2xl'>Lista de Entregas</Text>
      <Box p="1rem">
        <TableChakra columns={deliveryColumns} data={deliveryList} onRowClick={handleRowClick} />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" mb="2">
            Detalhes da Entrega
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedDelivery && (
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem colSpan={2}>
                  <VStack align="flex-start" spacing={4}>
                    <FormControl>
                      <FormLabel>Nome do Usuário</FormLabel>
                      <Input value={selectedDelivery.userName} isReadOnly />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Mês</FormLabel>
                      <Input value={selectedDelivery.month} isReadOnly />
                    </FormControl>
                  </VStack>
                </GridItem>
              </Grid>
            )}
          </ModalBody>

          <ModalFooter justifyContent='center'>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Delivery;

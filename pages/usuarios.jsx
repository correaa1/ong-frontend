import { useState, useEffect } from 'react';
import axios from 'axios';
import TableChakra from '@/app/components/TableChakra';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Index = () => {
  const [users, setUsers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const userColumns = [
    { label: 'Nome', key: 'name' },
    { label: 'Idade', key: 'age' },
    { label: 'Whatsapp', key: 'phone' },
  ];

  const handleRowClick = async (userId) => {
    setSelectedUserId(userId);
    try {
      const response = await axios.get(`http://localhost:8080/v1/users/${userId}`);
      setSelectedUser(response.data);
      onOpen();
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleAddFamilyMember = () => {
    onClose();
    router.push(`/cadastro-familiar?userId=${selectedUserId}`);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    console.log(`Selecionado o mês: ${month}`);
  };

  const handleSave = async () => {
    try {
      const data = {
        month: selectedMonth,
        users: [{ id: selectedUserId }],
      };
      await axios.post('http://localhost:8080/v1/delivery', data);
      console.log('Entrega salva com sucesso!');
      onClose();
    } catch (error) {
      console.error('Error saving delivery:', error);
    }
  };

  return (
    <Box minH='57rem' bg='blue.50'>
      <Text mx='2rem' mt='2rem' fontWeight='bold' fontSize='2xl'>Lista de usuários</Text>
      <Box p="1rem">
        <TableChakra columns={userColumns} data={users} onRowClick={handleRowClick} />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" mb="2">
            Perfil do Usuário
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedUser && (
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem colSpan={2}>
                  <VStack align="flex-start" spacing={4}>
                    <FormControl>
                      <FormLabel>Nome</FormLabel>
                      <Input value={selectedUser.name} isReadOnly />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Idade</FormLabel>
                      <Input value={selectedUser.age} isReadOnly />
                    </FormControl>
                  </VStack>
                </GridItem>
                <GridItem>
                  <VStack align="flex-start" spacing={4}>
                    <FormControl>
                      <FormLabel>Status</FormLabel>
                      <Input value={selectedUser.stats || 'Não informado'} isReadOnly />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Telefone</FormLabel>
                      <Input value={selectedUser.phone || 'Não informado'} isReadOnly />
                    </FormControl>
                  </VStack>
                </GridItem>
                <GridItem>
                  <VStack align="flex-start" spacing={4}>
                    <FormControl>
                      <FormLabel>Tamanho de roupa</FormLabel>
                      <Input value={selectedUser.clothingSize || 'Não informado'} isReadOnly />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Número de calçado</FormLabel>
                      <Input value={selectedUser.shoe || 'Não informado'} isReadOnly />
                    </FormControl>
                  </VStack>
                </GridItem>
                <GridItem colSpan={2}>
                  <VStack align="flex-start" spacing={4}>
                    <FormControl>
                      <FormLabel>Notas</FormLabel>
                      <Input value={selectedUser.note || 'Não informado'} isReadOnly />
                    </FormControl>
                  </VStack>
                </GridItem>
              </Grid>
            )}
          </ModalBody>

          <ModalFooter justifyContent='space-around'>
            <Box mr={3}>
              <Menu>
                <MenuButton as={Button} colorScheme="blue">
                  Entrega
                </MenuButton>
                <MenuList>
                  {Array.from({ length: 12 }, (_, index) => {
                    const monthName = new Date(0, index).toLocaleString('default', { month: 'long' });
                    return (
                      <MenuItem key={index} onClick={() => handleMonthSelect(monthName)}>
                        {monthName}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            </Box>
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              Salvar
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Editar
            </Button>
            <Button colorScheme="cyan" mr={3} onClick={handleAddFamilyMember}>
              Familiar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;

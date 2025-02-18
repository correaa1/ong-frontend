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
import { ChevronDownIcon } from 'lucide-react';

const Index = () => {
  const [users, setUsers] = useState([]);
  const { isOpen: isOpenAddDelivery, onOpen: onOpenAddDelivery, onClose: onCloseAddDelivery } = useDisclosure();
  const { isOpen: isOpenUserProfile, onOpen: onOpenUserProfile, onClose: onCloseUserProfile } = useDisclosure();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ongnany.tech/v1/users');
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

  const handleRowClick = async (userId, event) => {
    console.log('ID do Usuário Selecionado weed:', userId); 
    const clickedOnCheckbox = event && (event.target.tagName === 'INPUT' || event.target.tagName === 'LABEL');
    if (!clickedOnCheckbox) {
      setSelectedUserId(userId);
      try {
        const response = await axios.get(`https://ongnany.tech/v1/users/${userId}`);
        setSelectedUser(response.data);
        onOpenUserProfile();
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
  };
  
  
  

  const handleAddFamilyMember = () => {
    onCloseUserProfile(); 
    router.push(`/cadastro-familiar?userId=${selectedUserId}`);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    console.log(`Selecionado o mês: ${month}`);
  };

  const handleSave = async () => {
    try {
      console.log('Selected Month:', selectedMonth);
      console.log('Selected User IDs:', selectedUserId);
  
  
      const data = {
        month: selectedMonth,
        userIds: selectedUserId,
      };
  
      console.log('Data to be sent:', data);
  
      const response = await axios.post('https://ongnany.tech/v1/delivery', data);
      console.log('Resposta da API:', response.data);
      onCloseAddDelivery(); // Fechar o modal após salvar
    } catch (error) {
      console.error('Error saving delivery:', error);
    }
  };
  
  const handleSelectedRowsChange = (selectedRows) => {
    console.log('IDs dos usuários selecionados:', selectedRows);
    // Atualize o estado ou faça outras operações necessárias aqui
  };
  
  
  
  

  return (
    <Box minH='57rem' p='1rem' bg='white'>
      <Text mx='2rem' m='2rem' fontWeight='bold' fontSize='2xl'>Lista de usuários</Text>
      <Box w='full' h='full' p='1rem' rounded='xl' bg='whitesmoke'>
      <Box  >
        <TableChakra columns={userColumns} data={users} onRowClick={handleRowClick}   onSelectedRowsChange={handleSelectedRowsChange}   />
      </Box>

      <Modal isOpen={isOpenUserProfile} onClose={onCloseUserProfile}>
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
                      <Input value={selectedUser.name || 'Não informado'} isReadOnly />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Idade</FormLabel>
                      <Input value={selectedUser.age || 'Não informado'} isReadOnly />
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
                <MenuButton  as={Button} colorScheme="blue">
                  Entrega
                </MenuButton>
                <MenuList>
                  {Array.from({ length: 12 }, (_, index) => {
                    const monthName = new Date(0, index).toLocaleString('default', { month: 'long' });
                    return (
               
                     <MenuItem  key={index} onClick={() => handleMonthSelect(monthName)}>
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
            <Button colorScheme="red" mr={3} onClick={onCloseUserProfile}>
              Editar
            </Button>
            <Button colorScheme="cyan" mr={3} onClick={handleAddFamilyMember}>
              Familiar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
      </Box>

     
  );
};

export default Index;

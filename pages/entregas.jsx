import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeliveryTable from '@/app/components/TableDelivery';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { Select, Button, Box, Text, Flex } from '@chakra-ui/react';
import { confirmAlert } from 'react-confirm-alert'; // Importa a função de confirmação
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importa o CSS

const DeliveryPage = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState(false);
  const [columns] = useState([
    { key: 'name', label: 'Nome do Usuário' },
    { key: 'age', label: 'Idade' },
    { key: 'phone', label: 'Telefone' },
    { key: 'clothingSize', label: 'Tamanho de Roupas' },
    { key: 'shoe', label: 'Número do Calçado' },
    { key: 'note', label: 'Observação' }
  ]);

  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];

  useEffect(() => {
    const fetchDeliveries = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/v1/delivery');
        setDeliveries(response.data);
      } catch (error) {
        console.error('Erro ao buscar entregas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  useEffect(() => {
    const fetchUsersForSelectedMonth = () => {
      const selectedDelivery = deliveries.find(delivery => delivery.month === selectedMonth);
      if (selectedDelivery) {
        setFilteredUsers(selectedDelivery.users);
      } else {
        setFilteredUsers([]);
      }
    };

    if (selectedMonth) {
      fetchUsersForSelectedMonth();
    }
  }, [selectedMonth, deliveries]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    console.log('Mês selecionado:', e.target.value);
  };

  const handleRowClick = (id) => {
    setSelectedUserId(id);
    console.log('Usuário clicado:', id);
  };

  const handleRemove = async () => {
    if (!selectedMonth || !selectedUserId) return;

    confirmAlert({
      title: 'Confirmar Exclusão',
      message: 'Você tem certeza que deseja remover este usuário?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            setIsRemoving(true);
            try {
              await axios.delete('http://localhost:8080/v1/delivery', {
                data: {
                  month: selectedMonth,
                  userIds: [selectedUserId]
                }
              });
              const updatedDeliveries = deliveries.map(delivery => 
                delivery.month === selectedMonth
                  ? { ...delivery, users: delivery.users.filter(user => user.id !== selectedUserId) }
                  : delivery
              );
              setDeliveries(updatedDeliveries);
              handleMonthChange({ target: { value: selectedMonth } });
            } catch (error) {
              console.error('Erro ao remover usuário:', error);
            } finally {
              setIsRemoving(false);
            }
          }
        },
        {
          label: 'Não',
          onClick: () => console.log('Remoção cancelada')
        }
      ]
    });
  };

  return (
    <Box h='57rem' bg='white' p={4}>
      <Text mx='2rem' m='2rem' fontWeight='bold' fontSize='2xl'>Lista de usuários</Text>
      <Box w='full' h='full' p='1rem' rounded='xl' bg='whitesmoke'>
        <Flex mb='1rem' alignItems='center' mx='1rem' justifyContent='flex-end'>
          <Box>
            <Select 
              placeholder="Selecione o mês" 
              onChange={handleMonthChange} 
              value={selectedMonth}
              isDisabled={isLoading}
            >
              {months.map(month => (
                deliveries.some(delivery => delivery.month === month) && (
                  <option key={month} value={month}>
                    {month.charAt(0).toUpperCase() + month.slice(1)}
                  </option>
                )
              ))}
            </Select>
          </Box>
          <Button 
            ml={2} 
            colorScheme="red" 
            onClick={handleRemove} 
            disabled={!selectedUserId || isRemoving}
            isLoading={isRemoving}
          >
            Remover
          </Button>
        </Flex>
        {isLoading ? (
          <LoadingSpinner message="Carregando entregas..." />
        ) : (
          <DeliveryTable
            data={filteredUsers}
            columns={columns}
            onRowClick={handleRowClick}
            selectedUserId={selectedUserId}
            showMonthSelector={false}
            showDeleteButton={true}
          />
        )}
      </Box>
    </Box>
  );
};

export default DeliveryPage;

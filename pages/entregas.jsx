import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeliveryTable from '@/app/components/TableDelivery';
import { Select, Button, Box } from '@chakra-ui/react';

const DeliveryPage = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [columns] = useState([
    { key: 'name', label: 'Nome do Usuário' },
    { key: 'age', label: 'Idade' },
    { key: 'phone', label: 'Telefone' },
    { key: 'clothingSize', label: 'Tamanho de Roupas' },
    { key: 'shoe', label: 'Número do Calçado' },
    { key: 'note', label: 'Observação' }
  ]);

  useEffect(() => {
    // Função para buscar todos os dados das entregas
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/delivery');
        setDeliveries(response.data);
      } catch (error) {
        console.error('Erro ao buscar entregas:', error);
      }
    };

    fetchDeliveries();
  }, []);

  useEffect(() => {
    // Função para buscar usuários do mês selecionado
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
  }, [selectedMonth, deliveries]); // Dependências

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

    try {
      await axios.delete('http://localhost:8080/v1/delivery', {
        data: { // Adiciona a chave 'data' para o payload do DELETE
          month: selectedMonth,
          userIds: [selectedUserId]
        }
      });
      console.log('Usuário removido:', selectedUserId);
      // Atualiza os usuários filtrados após a remoção
      const updatedDeliveries = deliveries.map(delivery => 
        delivery.month === selectedMonth
          ? { ...delivery, users: delivery.users.filter(user => user.id !== selectedUserId) }
          : delivery
      );
      setDeliveries(updatedDeliveries);
      handleMonthChange({ target: { value: selectedMonth } }); // Recarrega os usuários do mês
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
    }
  };

  return (
    <Box p={4}>
      <h1>Gerenciar Entregas</h1>
      <Select placeholder="Selecione o mês" onChange={handleMonthChange} value={selectedMonth}>
        {deliveries.map(delivery => (
          <option key={delivery.id} value={delivery.month}>
            {delivery.month}
          </option>
        ))}
      </Select>
      <Button mt={4} ml={2} colorScheme="red" onClick={handleRemove} disabled={!selectedUserId}>
        Remover
      </Button>

      <DeliveryTable
        data={filteredUsers}
        columns={columns}
        onRowClick={handleRowClick}
        selectedUserId={selectedUserId}
        showMonthSelector={false}
        showDeleteButton={true}
      />
    </Box>
  );
};

export default DeliveryPage;

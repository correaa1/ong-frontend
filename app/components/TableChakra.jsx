import React, { useState, useMemo, useEffect } from 'react';
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  useColorModeValue,
  Container,
  Box,
  Checkbox,
  Button,
  Select
} from "@chakra-ui/react";
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Importa a biblioteca
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importa o estilo padrão

const StatusCell = ({ status }) => {
  let bgColor = '';
  let textColor = '';

  switch (status) {
    case "Ativo":
    case "DONE":
    case "Aprovado":
      bgColor = 'green.400';
      textColor = 'white';
      break;
    case "REJECTED":
    case "Reprovado":
      bgColor = 'red.400';
      textColor = 'white';
      break;
    default:
      bgColor = '#1a202c';
      textColor = 'gray.400';
      break;
  }

  return (
    <Flex
      w="6rem"
      h="2rem"
      align="center"
      justify="center"
      borderRadius="16px"
      bg={bgColor}
    >
      <Text
        color={textColor}
        fontWeight="bold"
        fontSize="md"
      >
        {status}
      </Text>
    </Flex>
  );
};

const TableChakra = ({ data, columns = [], onRowClick, showMonthSelector = true, showSaveButton = true, onDelete }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const color = useColorModeValue('black', 'white');
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [month, setMonth] = useState('');

  useEffect(() => {
    console.log("IDs dos usuários selecionados:", Array.from(selectedRows));
    console.log("Mês selecionado:", month);
  }, [selectedRows, month]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key) {
      direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleCheckboxChange = (id) => {
    setSelectedRows(prevSelectedRows => {
      const newSelectedRows = new Set(prevSelectedRows);
      if (newSelectedRows.has(id)) {
        newSelectedRows.delete(id);
      } else {
        newSelectedRows.add(id);
      }
      return newSelectedRows;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      const allIds = sortedData.map(item => item.id);
      setSelectedRows(new Set(allIds));
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    const allIds = sortedData.map(item => item.id);
    setSelectAll(allIds.length > 0 && allIds.every(id => selectedRows.has(id)));
  }, [selectedRows, sortedData]);

  const handleSave = () => {
    if (!month) {
      alert("Por favor, selecione um mês.");

      return;
    }

    const dataToSend = {
      month,
      userIds: Array.from(selectedRows)
    };

    confirmAlert({
      title: 'Confirma entrega!',
      message: `Deseja salvar a entrega para o mês de ${month}?`,
      buttons: [
        {
          label: 'Salvar',
          onClick: () => {
            console.log("Data to be sent:", dataToSend);

            axios.post('http://localhost:8080/v1/delivery', dataToSend)
              .then(response => {
                console.log("Save successful:", response);
                setSelectedRows(new Set());
                setSelectAll(false);
                setMonth(''); 
              })
              .catch(error => {
                console.error("Error saving delivery:", error);
              });
          }
        },
        {
          label: 'Cancelar',
          onClick: () => console.log('Cancelado')
        }
      ]
    });
  };

  const handleRowClick = (id) => {
    onRowClick(id); 
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    return null;
  };

  return (
    <Container minW='100%'>
      <Flex mb="1rem" alignItems="center" justifyContent='flex-end'>
        {showMonthSelector && (
          <>
            <Select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="Selecione o mês"
              maxW="200px"
              mr="1rem"
            >
              <option value="janeiro">Janeiro</option>
              <option value="fevereiro">Fevereiro</option>
              <option value="março">Março</option>
              <option value="abril">Abril</option>
              <option value="maio">Maio</option>
              <option value="junho">Junho</option>
              <option value="julho">Julho</option>
              <option value="agosto">Agosto</option>
              <option value="setembro">Setembro</option>
              <option value="outubro">Outubro</option>
              <option value="novembro">Novembro</option>
              <option value="dezembro">Dezembro</option>
            </Select>
          
            {showSaveButton && <Button colorScheme='green' onClick={handleSave}>Salvar Entregas</Button>}
          </>
        )}
        {onDelete && <Button onClick={onDelete}>Excluir Dados</Button>}
      </Flex>
      <TableContainer rounded='lg'>
        <Table variant="striped" bg='white' w='full'>
          <Thead>
            <Tr position='sticky' top={0} h='4.5rem' zIndex={1} bg='white' my=".8rem">
              <Th>
                <Checkbox isChecked={selectAll} onChange={handleSelectAll} />
              </Th>
              {columns && columns.map((column, index) => (
                <Th
                  key={index}
                  fontSize="sm"
                  color={color}
                  cursor={column.onClick ? "pointer" : "default"}
                  onClick={column.onClick ? (() => requestSort(column.key)) : undefined}
                >
                  <Flex alignItems='center'>
                    {column.label}
                    {column.onClick && <Box ml='0.5rem'>{renderSortIcon(column.key)}</Box>}
                  </Flex>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {sortedData.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <Checkbox
                    isChecked={selectedRows.has(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </Td>
                {columns && columns.map((column, columnIndex) => (
                  <Td key={columnIndex} maxWidth="150px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                    <Flex align="center">
                      {column.key === 'status' ? (
                        <StatusCell status={item[column.key]} />
                      ) : (
                        <Text
                          fontSize="md"
                          w={{ base: '100px', sm: '100px', md: '50px' }}
                          cursor="pointer"
                          onClick={(event) => {
                            if (event.target.tagName !== 'INPUT') {
                              handleRowClick(item.id);
                            }
                          }}
                        >
                          {item[column.key]}
                        </Text>
                      )}
                    </Flex>
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TableChakra;

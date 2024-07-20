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
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import axios from 'axios';

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

const TableChakra = ({ data, columns, onRowClick }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const color = useColorModeValue('black', 'white');
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [month, setMonth] = useState("março"); // Default month

  useEffect(() => {
    console.log("IDs dos usuários selecionados:", Array.from(selectedRows));
  }, [selectedRows]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = null;
      key = null;
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
    const allSelected = allIds.length > 0 && allIds.every(id => selectedRows.has(id));
    setSelectAll(allSelected);
  }, [selectedRows, sortedData]);

  const handleSave = () => {
    const dataToSend = {
      month,
      userIds: Array.from(selectedRows) // Convert Set to Array
    };

    console.log("Data to be sent:", dataToSend);

    axios.post('http://localhost:8080/v1/delivery', dataToSend)
      .then(response => {
        console.log("Save successful:", response);
        // Handle success (e.g., show a message or update the state)
      })
      .catch(error => {
        console.error("Error saving delivery:", error);
        // Handle error (e.g., show an error message)
      });
  };

  const handleRowClick = (id) => {
    onRowClick(id); // Call the passed onRowClick function with the row ID
  };

  return (
    <Container minW='100%'>
      <Flex mb="1rem" alignItems="center">
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
        <Button onClick={handleSave}>Salvar Dados</Button>
      </Flex>
      <TableContainer rounded='lg'>
        <Table variant="striped" bg='blue.100' w='full'>
          <Thead>
            <Tr position='sticky' top={0} h='4.5rem' zIndex={1} bg='blue.200' my=".8rem">
              <Th>
                <Checkbox isChecked={selectAll} onChange={handleSelectAll} />
              </Th>
              {columns.map((column, index) => (
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
            {sortedData.map((item, index) => (
              <Tr key={index} cursor="pointer">
                <Td>
                  <Checkbox
                    isChecked={selectedRows.has(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </Td>
                {columns.map((column, columnIndex) => (
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
                            // Prevent opening the modal if the click was on the checkbox
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

import React, { useState, useMemo } from 'react';
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
  Box
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

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

  const renderSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'ascending' ? <ChevronUpIcon /> :
      sortConfig.direction === 'descending' ? <ChevronDownIcon /> : null;
  };

  return (
    <Container  minW='100%'>
    <TableContainer  rounded='lg'>
      <Table variant="striped" bg='blue.100' w='full'>
        <Thead>
          <Tr position='sticky' top={0} h='4.5rem' zIndex={1} bg='blue.200' my=".8rem">
            {columns.map((column, index) => (
              <Th fontSize="sm" color={color} key={index} onClick={() => requestSort(column.key)} cursor="pointer">
                <Flex alignItems='center'>
                  {column.label}
                  <Box ml='0.5rem'>{renderSortIcon(column.key)}</Box>
                </Flex>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {sortedData.map((item, index) => (
            <Tr key={index} onClick={() => onRowClick(item.id)} cursor="pointer">
              {columns.map((column, columnIndex) => (
                <Td key={columnIndex} maxWidth="150px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                  <Flex align="center">
                    {column.key === 'status' ? <StatusCell status={item[column.key]} /> : (
                      <Text fontSize="md" w={{ base: '100px', sm: '100px', md: '50px' }}>{item[column.key]}</Text>
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

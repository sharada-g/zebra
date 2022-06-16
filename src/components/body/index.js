import React from 'react';

import { useContextProvider } from '../../context/contextProvider';

import {
  Flex,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from '@chakra-ui/react';

function Body() {
  const { tableHeader, tableData, readExcel, view, print, selectedPrinter } =
    useContextProvider();

  return (
    <>
      <Flex>
        <Input
          m={0}
          p={0}
          width="full"
          placeholder="Import Excel"
          variant="ghost"
          type={'file'}
          onChange={e => {
            const file = e.target.files[0];
            readExcel(file);
          }}
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
      </Flex>
      {tableHeader.length > 0 && tableData.length > 0 && (
        <TableContainer maxHeight="79vh" overflowY="scroll">
          <Table size="sm" variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                {tableHeader.map((key, index) => (
                  <Th key={index}>{key}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {
                // start the table from the second row
                tableData.map((data, index) => (
                  <Tr key={index}>
                    {Object.values(data).map((value, index) => (
                      <Td key={index}>{value}</Td>
                    ))}

                    <Td>
                      <Input type="checkbox" variant="filled" />
                    </Td>

                    <Td>
                      <Button variant="solid" onClick={() => view(data)}>
                        View
                      </Button>
                    </Td>

                    <Td>
                      <Button
                        variant="solid"
                        disabled={!selectedPrinter}
                        onClick={() => print(data)}
                      >
                        Print
                      </Button>
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default Body;

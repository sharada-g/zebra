import React from 'react';
import { Center, Flex, Text, Stack, Button } from '@chakra-ui/react';

import { useContextProvider } from '../../context/contextProvider';

function Printer() {
  const { selectedPrinter, printers, getPrinters, setPrinter } =
    useContextProvider();
  return (
    <Flex h={'100%'}>
      <Center flex="1">
        {selectedPrinter ? (
          <Text>Selected Printer : {selectedPrinter}</Text>
        ) : (
          <Text color={'gray.500'}>No Printer Selected</Text>
        )}
      </Center>
      <Stack
        spacing={4}
        direction="row"
        align="center"
        flex="1"
        justify={'end'}
      >
        {printers.length > 0 &&
          printers.map((printer, index) => (
            <Button key={index} m={1} onClick={() => setPrinter(printer)}>
              {printer.name}
            </Button>
          ))}

        {printers.length === 0 && (
          <Button
            onClick={() => {
              getPrinters();
            }}
          >
            <Text>Scan for Printers</Text>
          </Button>
        )}
      </Stack>
    </Flex>
  );
}

export default Printer;

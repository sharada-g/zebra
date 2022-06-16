import React from 'react';
import { Text, Stack, Button } from '@chakra-ui/react';

import { useContextProvider } from '../../context/contextProvider';

function SideButton() {
  const { selectedPrinter, sideImg } = useContextProvider();
  return (
    <>
      {sideImg && (
        <Stack
          spacing={4}
          direction="row"
          align="end"
          flex="1"
          justify={'center'}
        >
          <Button variant="ghost" disabled={!selectedPrinter}>
            <Text>Print Selected</Text>
          </Button>
          <Button variant="ghost" disabled={!selectedPrinter}>
            <Text>Print All</Text>
          </Button>
        </Stack>
      )}
    </>
  );
}

export default SideButton;

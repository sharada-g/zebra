import React from 'react';
import { ChakraProvider, Box, theme, Grid, GridItem } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

//components
import Logo from './components/logo';
import Printer from './components/printer';
import Body from './components/body';
import Side from './components/side';
import SideButton from './components/sideButton';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher />
      <Box textAlign="center" fontSize="xl" paddingLeft={5} paddingRight={5}>
        <Grid
          h="100vh"
          templateRows="repeat(12, 1fr)"
          templateColumns="repeat(12, 1fr)"
          gap={2}
        >
          <GridItem colSpan={2} rowSpan={2}>
            <Logo />
          </GridItem>
          <GridItem colSpan={10} rowSpan={2}>
            <Printer />
          </GridItem>
          <GridItem colSpan={8} rowSpan={10}>
            <Body />
          </GridItem>
          <GridItem colSpan={4} rowSpan={9}>
            <Side />
          </GridItem>
          <GridItem colSpan={4} rowSpan={1}>
            <SideButton />
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;

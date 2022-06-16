import React from 'react';
import { Image } from '@chakra-ui/react';

import { useContextProvider } from '../../context/contextProvider';

function Side() {
  const { sideImg } = useContextProvider();
  return (
    <>{sideImg && <Image src={sideImg} boxSize="full" objectFit="contain" />}</>
  );
}

export default Side;

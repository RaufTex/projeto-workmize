import {
  Box,
  Button,
  StylesProvider,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import styles from '../styles/Home.module.css';
import { Switch } from '@chakra-ui/react';
import { BsSun } from 'react-icons/bs';

export default function ColorModeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgSwitch = useColorModeValue('#ffffff', '#171923');
  return (
    <header>
      <Box>
        {/* <span>Dia</span> */}

        <Button
          as={Switch}
          //bg='black'
          variant='link'
          marginLeft={2}
          //marginRight={2}
          //color={bgSwitch}
          colorScheme='#000'
          onChange={toggleColorMode}
          icon={<BsSun />}
        >
          {/* Toggle {colorMode === 'light' ? 'Dark' : 'Light'} */}
        </Button>

        {/* <span>Noite</span> */}
      </Box>
    </header>
  );
}

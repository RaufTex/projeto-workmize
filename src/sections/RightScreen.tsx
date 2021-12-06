import {
  Box,
  Button,
  ColorModeProvider,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import { Input } from '@chakra-ui/react';
import React, { useState } from 'react';

import { BsEye } from 'react-icons/bs';
import ColorModeSwitcher from '../../pages/ColorModeSwitcher';

export default function RightScreen() {
  const bgRight = useColorModeValue(
    'transparent linear-gradient(138deg,#b794f4 0%,#805ad5 100%,#312950 100%, #322659 100%) 0% 0% no-repeat padding-box',
    'transparent linear-gradient(138deg, #805ad5 0%, #312950 100%, #322659 100%) 0% 0% no-repeat padding-box'
  );

  return (
    <VStack w='full' h='full' alignItems='flex-start' bg={bgRight}>
      <Box className={styles.switch}>
        <HStack display='flex' alignItems='center' flexWrap='wrap'>
          <Text>Dia</Text> <ColorModeSwitcher /> <Text>Noite</Text>
        </HStack>
      </Box>

      <VStack w='full' h='full' py={40} alignItems='center'>
        <Box>
          <Image
            src='/tarefasEscuro.svg'
            alt='Tarefas Logo'
            width={272}
            height={246}
          />
        </Box>
        <Text className={styles.initialTitle}>Gerencie as suas tarefas</Text>
      </VStack>
    </VStack>
  );
}

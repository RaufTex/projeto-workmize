import {
  Box,
  Button,
  ColorModeProvider,
  Container,
  Flex,
  Icon,
  IconButton,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import ColorModeSwitcher from './ColorModeSwitcher';
import { BsEye } from 'react-icons/bs';
import Login from '../src/sections/Login';
import RightScreen from '../src/sections/RightScreen';
import { useMutation } from '@apollo/client';
import { ADD_NEW_USER, ADD_NEW_TASK } from '../graphql/queries';

export default function Home() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const { toggleColorMode } = useColorMode();

  const bgLeft = useColorModeValue(
    '#ffffff 0% 0% no-repeat padding-box',
    '#171923 0% 0% no-repeat padding-box;'
  );
  const bgRight = useColorModeValue(
    'transparent linear-gradient(138deg,#b794f4 0%,#805ad5 100%,#312950 100%, #322659 100%) 0% 0% no-repeat padding-box',
    'transparent linear-gradient(138deg, #805ad5 0%, #312950 100%, #322659 100%) 0% 0% no-repeat padding-box'
  );
  const bgInput = useColorModeValue(
    '#EDF2F7 0% 0% no-repeat padding-box',
    '#0F1016 0% 0% no-repeat padding-box'
  );

  return (
    <Container maxW='cointainer.xl' p={0}>
      <Flex
        h={{ base: 'auto', md: '100vh' }}
        py={['auto', 'auto', 0]}
        direction={{ base: 'column', md: 'row' }}
      >
        <Login />

        <RightScreen />
      </Flex>
    </Container>
  );
}

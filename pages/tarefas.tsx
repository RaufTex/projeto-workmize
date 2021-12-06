import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  SimpleGrid,
  VStack,
  Image,
  useColorModeValue,
  WrapItem,
  Text,
  Spacer,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import styles from '../styles/Tarefas.module.css';
import { AiFillHome } from 'react-icons/ai';
import ColorModeSwitcher from './ColorModeSwitcher';
import TableTasks from '../src/components/Table';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';
import NextLink from 'next/link';
import styled from '@emotion/styled';
import { BsBoxArrowInDownLeft } from 'react-icons/bs';
import Navbar from '../src/components/Navbar';
import MenuHover from '../src/components/MenuHover';
import { useAuth } from '../src/contexts/AuthContext';
import ModalNewTask from '../src/components/ModalNewTask';

export default function Tarefas() {
  const { user, getUsers, tasks, getTasks } = useAuth();

  const bgButton = useColorModeValue(
    '#ffffff 0% 0% no-repeat padding-box',
    '#171923 0% 0% no-repeat padding-box'
  );
  const bgFull = useColorModeValue(
    '#F6F7FB 0% 0% no-repeat padding-box',
    '#22242E 0% 0% no-repeat padding-box'
  );
  const bgShadow = useColorModeValue('0px 2px 5px #0000001c', '');

  const bgBoxTable = useColorModeValue(
    '#FFFFFF 0% 0% no-repeat padding-box',
    '#171923 0% 0% no-repeat padding-box'
  );

  const logoBottom = useColorModeValue(
    '/logoLightTask.svg',
    '/logoDarkTask.svg'
  );

  return (
    <>
      <Flex w='full' h='full' bg={bgFull}>
        <VStack mt={23} h='full' w={62} alignItems='center'>
          <IconButton
            bg={bgButton}
            boxShadow={bgShadow}
            aria-label='home'
            className={styles.homeButton}
            color='#805AD5'
            icon={<AiFillHome />}
          ></IconButton>
          <Box className={styles.logoBottom}>
            <Image src={logoBottom} alt='Tarefas Logo' />
          </Box>
          <Box className={styles.switchTasks}>
            <ColorModeSwitcher />
          </Box>
        </VStack>
        <Container marginInlineStart={23} maxW='container.lg' p={0}>
          <Flex h='100vh' w='100vw' pt={11}>
            <HStack w='full' h='full' alignItems='flex-start'>
              <Box bg={bgFull} className={styles.tasksBox}>
                <Navbar />
                <HStack spacing='24px' marginLeft='2%'>
                  <Text>Filtros Rápidos</Text>
                  <Button>Todas</Button>
                  <Button>Criadas por mim</Button>
                  <Button>Sou responsável</Button>
                </HStack>

                <Box className={styles.buttonNewTask}>
                  <Button colorScheme='purple'>
                    <ModalNewTask />
                  </Button>
                </Box>

                <Box background={bgBoxTable} className={styles.tasksBoxInside}>
                  {tasks ? <TableTasks /> : <p></p>}
                </Box>
              </Box>
            </HStack>
          </Flex>
        </Container>
      </Flex>
    </>
  );
}

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import styles from '../../styles/Modal.module.css';
import { GoPerson } from 'react-icons/go';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
/* import Select, { OptionProps } from 'react-select'; */
import { Select } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { ADD_NEW_USER, ADD_NEW_TASK, LOGIN_USER } from '../../graphql/queries';
import { useQuery, useMutation } from '@apollo/client';
import { useAuth } from '../contexts/AuthContext';
import Router from 'next/router';

enum Roles {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

type FormValues = {
  name: string;
  email: string;
  password: string;
  role: Roles;
  companyId: string;
};

export default function ModalNew() {
  const [signUp, { data, loading, error }] = useMutation(ADD_NEW_USER);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  function onSubmit(values) {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();

  const initialRef = useRef();
  const finalRef = useRef();
  const bgInput = useColorModeValue(
    '#EDF2F7 0% 0% no-repeat padding-box',
    '#0F1016 0% 0% no-repeat padding-box'
  );

  const { signIn } = useAuth();

  return (
    <>
      <Button colorScheme='teal' variant='link' onClick={onOpen}>
        Crie seu usário
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent borderRadius={36} className={styles.newUser}>
          <ModalHeader className={styles.modalHeader}>
            <Text display='center' className={styles.textHeader}>
              <GoPerson /> Criar Usuário
            </Text>
          </ModalHeader>
          <ModalCloseButton size='22' color='white' />
          <ModalBody pb={6} alignItems='center'>
            <Stack alignItems='center' className={styles.stackData}>
              <Text
                marginRight='40%'
                marginTop={5}
                className={styles.textStack}
              >
                Dados do seu usuário
              </Text>
              <Avatar size='2xl'></Avatar>
              <form
                id='newUser'
                onSubmit={handleSubmit(async data => {
                  await signUp({
                    variables: {
                      name: data.name,
                      email: data.email,
                      password: data.password,
                      role: data.role,
                      companyId: '03c9e576-49ad-408d-91cf-c4365e756f65',
                    },
                  });
                  await signIn({
                    email: data.email,
                    password: data.password,
                    role: data.role,
                  });
                })}
              >
                <FormLabel htmlFor='name'>Nome</FormLabel>
                <Input
                  bg={bgInput}
                  h='36px'
                  size='md'
                  mb='4px'
                  id='nome'
                  placeholder='Digite o seu nome...'
                  {...register('name', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                {errors.name && <p>{errors.name.message}</p>}

                <FormLabel htmlFor='email'>E-mail</FormLabel>
                <Input
                  bg={bgInput}
                  h='36px'
                  size='md'
                  mb='4px'
                  id='email'
                  placeholder='Digite o seu nome...'
                  {...register('email', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />

                <FormLabel htmlFor='password'>Senha</FormLabel>
                <InputGroup>
                  <Input
                    h='36px'
                    id='password'
                    mb='4px'
                    placeholder='Digite a senha...'
                    {...register('password', {
                      required: 'This is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                    })}
                    bg={bgInput}
                    size='md'
                    variant='filled'
                    type={show ? 'text' : 'password'}
                  />
                  <InputRightElement h={'full'}>
                    {/* <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? ( */}
                    <Button onClick={handleClick} variant='ghost'>
                      {show ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <FormLabel htmlFor='role'>Permissão</FormLabel>
                <Select
                  size='md'
                  h='36px'
                  bg={bgInput}
                  variant='filled'
                  {...register('role')}
                  id='role'
                >
                  <option value={Roles.ADMIN.valueOf()}>Administrador</option>
                  <option value={Roles.MEMBER.valueOf()}>Membro</option>
                </Select>

                {/* <Select
                  options={[
                    { value: 'ADMIN', label: 'Administrador' },
                    { value: 'MEMBER', label: 'Membro' },
                  ]}
                /> */}

                <FormErrorMessage>
                  {errors.name && errors.name.message}
                  {errors.role && errors.role.message}
                </FormErrorMessage>
              </form>
              {/* <FormControl>
                <FormLabel>First name</FormLabel>
                <Input ref={initialRef} placeholder='First name' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Last name</FormLabel>
                <Input placeholder='Last name' />
              </FormControl> */}
            </Stack>
          </ModalBody>

          <ModalFooter margin='0 auto'>
            <Button
              mb='9px'
              w='180px'
              form='newUser'
              type='submit'
              colorScheme='purple'
            >
              Criar Usuário
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

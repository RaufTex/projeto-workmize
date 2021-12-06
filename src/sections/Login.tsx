import {
  Box,
  Button,
  ColorModeProvider,
  Container,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Icon,
  IconButton,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
  VStack,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import { Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsEye } from 'react-icons/bs';
import ColorModeSwitcher from '../../pages/ColorModeSwitcher';
//import { Select } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { Select } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import ModalNew from '../components/ModalNew';
import { LOGIN_USER } from '../../graphql/queries';
import { useQuery, useMutation } from '@apollo/client';
import { useAuth } from '../contexts/AuthContext';

enum Roles {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

type FormValues = {
  email: string;
  password: string;
  role: Roles;
};

export default function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  //const [signIn, { data, loading, error }] = useMutation(LOGIN_USER);
  const { authToken, signIn } = useAuth();

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
  const buttonText = useColorModeValue('teal', 'teal');
  const logoWorkmize = useColorModeValue('/logoLight.svg', '/logoEscuro.svg');
  const colorTitle = useColorModeValue('#22242E', '#ffffff');
  const colorTitleAccess = useColorModeValue('#22242E', '#ffffff');
  const [isNotSmallestScreen] = useMediaQuery('(min-width: 600px)');
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      //padding: 20,
      width: 'auto',
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 'auto',
      height: 'auto',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [alertInvalid, setAlertInvalid] = useState('none');

  return (
    <VStack w='full' h='full' alignItems='flex-start' bg={bgLeft}>
      <VStack
        w='full'
        h='full'
        mx={'auto'}
        maxW={'lg'}
        py={40}
        alignItems='center'
      >
        <Box className={styles.logo}>
          <Image src={logoWorkmize} alt='Vercel Logo' width={195} height={33} />
        </Box>
        <Text color={colorTitle} className={styles.titleAccess}>
          Acesse a Workmize
        </Text>
        <Text color={colorTitle} className={styles.titleInfo}>
          Por favor insira seus dados para prosseguir.
        </Text>
        <Alert
          w={400}
          overflow='visible'
          borderRadius='5px'
          status='error'
          display={alertInvalid}
        >
          <AlertIcon />
          E-mail ou senha inválidos. Tente novamente.
        </Alert>
        <form
          onSubmit={handleSubmit(async data => {
            console.log('Login linha 156', data);
            try {
              const response = await signIn({
                email: data.email,
                password: data.password,
                role: data.role,
              });

              console.log(response);
            } catch (err) {
              if (err.graphQLErrors[0].message === 'User not found') {
                setAlertInvalid('E-mail ou senha inválidos. Tente novamente.');
              }
            }
          })}
        >
          <FormControl w={400} mt={18}>
            <FormLabel htmlFor='email'>E-mail</FormLabel>
            <Input
              bg={bgInput}
              h={55}
              size='lg'
              id='email'
              variant='filled'
              placeholder='nome@email.com.br'
              {...register('email', {
                required: 'Este campo não pode estar vazio',
                minLength: { value: 4, message: 'Minimum length should be 4' },
              })}
            />
            <Text color='red'>{errors.email && errors.email.message}</Text>
            <FormLabel htmlFor='password'>Senha</FormLabel>
            <InputGroup>
              <Input
                h={55}
                id='password'
                placeholder='Digite a senha...'
                {...register('password', {
                  required: 'Este campo não pode estar vazio',
                  minLength: {
                    value: 4,
                    message: 'Tamanho mínino 4 caracteres',
                  },
                })}
                bg={bgInput}
                size='lg'
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
            <Text color='red'>
              {errors.password && errors.password.message}
            </Text>

            <FormLabel htmlFor='role'>Permissão</FormLabel>
            <Select
              size='lg'
              h='55px'
              bg={bgInput}
              variant='filled'
              {...register('role')}
              id='role'
            >
              <option value={Roles.ADMIN.valueOf()}>Administrador</option>
              <option value={Roles.MEMBER.valueOf()}>Membro</option>
            </Select>
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            w='403px'
            h='66px'
            colorScheme='teal'
            isLoading={isSubmitting}
            type='submit'
          >
            Fazer Login
          </Button>
          <Text marginLeft='12%' color={colorTitle}>
            Ainda não é um usuário? <ModalNew />
          </Text>
        </form>
      </VStack>
    </VStack>
  );
}

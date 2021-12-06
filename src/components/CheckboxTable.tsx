/* eslint-disable react/display-name */
/* eslint-disable no-param-reassign */
import React, { forwardRef, useEffect, useRef } from 'react';

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
  IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import styles from '../../styles/ModalSelectTask.module.css';
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
import { AiOutlineCheckCircle, AiTwotoneDelete } from 'react-icons/ai';

interface IIndeterminateInputProps {
  indeterminate?: boolean;
  name: string;
}

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

const useCombinedRefs = (
  ...refs: Array<React.Ref<HTMLInputElement> | React.MutableRefObject<null>>
): React.MutableRefObject<HTMLInputElement | null> => {
  const targetRef = useRef(null);

  useEffect(() => {
    refs.forEach(
      (ref: React.Ref<HTMLInputElement> | React.MutableRefObject<null>) => {
        if (!ref) return;

        if (typeof ref === 'function') {
          ref(targetRef.current);
        } else {
          ref.current = targetRef.current;
        }
      }
    );
  }, [refs]);

  return targetRef;
};

const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  IIndeterminateInputProps
>(({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
  const defaultRef = useRef(null);
  const combinedRef = useCombinedRefs(ref, defaultRef);

  useEffect(() => {
    if (combinedRef?.current) {
      combinedRef.current.indeterminate = indeterminate ?? false;
    }
  }, [combinedRef, indeterminate]);
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
      <input type='checkbox' onClick={onOpen} ref={combinedRef} {...rest} />
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          marginTop='55%'
          borderRadius={36}
          className={styles.newUser}
        >
          <ModalHeader className={styles.modalHeader}>
            <HStack display='flex' alignItems='center' flexWrap='wrap'>
              <Text
                display='flex'
                marginRight='50%'
                alignItems='center'
                flexWrap='wrap'
                className={styles.textModalHeader}
                color='#FFFFFF'
              >
                <span margin-left='2px' /> Nova tarefa
              </Text>
              <ModalCloseButton size='22' color='#FFFFFF' />
            </HStack>
          </ModalHeader>

          <ModalBody pb={6} alignItems='center'>
            <HStack
              alignItems='center'
              display='flex'
              justifyContent='space-around'
            >
              <VStack>
                <IconButton
                  variant='filled'
                  isRound
                  aria-label='Search database'
                  icon={<AiOutlineCheckCircle />}
                />
                <span>Concluir</span>
              </VStack>
              <VStack>
                <IconButton
                  variant='filled'
                  isRound
                  aria-label='Search database'
                  icon={<AiTwotoneDelete />}
                />
                <span>Excluir</span>
              </VStack>
            </HStack>
          </ModalBody>

          <ModalFooter margin='0 auto'></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});

export default IndeterminateCheckbox;

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
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import styles from '../../styles/ModalNewTask.module.css';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FaListUl } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { GoPerson } from 'react-icons/go';
import { RiCalendarCheckLine } from 'react-icons/ri';
import Dropdown from './Dropdown';
import { useToast } from '@chakra-ui/react';

import { Stack, HStack, VStack } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
//import Select, { OptionProps } from 'react-select';
import { Select } from '@chakra-ui/react';
import 'react-dates/initialize';
import DatePicker from 'react-datepicker';
//import DatePicker from 'react-date-picker';
//import { MultiSelect } from 'react-multi-select-component';
import { Multiselect } from 'multiselect-react-dropdown';

import { registerLocale, setDefaultLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';
registerLocale('pt', pt);

import { ADD_NEW_USER, ADD_NEW_TASK, LOGIN_USER } from '../../graphql/queries';
import { useQuery, useMutation } from '@apollo/client';
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
} from 'react-dates';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

enum Roles {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

type FormValues = {
  name: string;
  responsible: [string];
  completionDate: Date;
};

export default function ModalNewTask() {
  /*  enum Roles {
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER',
  } */
  const [value, onChange] = useState(new Date());
  const [signUp, { data, loading, error }] = useMutation(ADD_NEW_USER);
  const [startDate, setStartDate] = useState(new Date());

  const { listUsers, createTask, getTasks } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    control,
    handleSubmit,
    register,
    setValue,
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
  /* const { control } = useForm({
    defaultValues: {
      firstName: '',
      select: {},
    },
  }); */

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const initialRef = useRef();
  const finalRef = useRef();
  const bgInput = useColorModeValue(
    '#EDF2F7 0% 0% no-repeat padding-box',
    '#0F1016 0% 0% no-repeat padding-box'
  );

  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState(listUsers);
  const [selectedValue, setSelectedValue] = useState([]);

  const handleChange = e => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
  };
  const [values, setReactSelect] = useState({
    selectedOption: [],
  });

  const handleMultiChange = selectedOption => {
    setValue(
      'responsible',
      selectedOption.map(sel => {
        return sel.id;
      })
    );
    setReactSelect({ selectedOption });
    console.log(
      selectedOption.map(sel => {
        return sel.id;
      })
    );
  };

  useEffect(() => {
    register('responsible');
  }, [register]);

  const toast = useToast();

  return (
    <>
      <Button colorScheme='teal' variant='link' onClick={onOpen}>
        <Text color='white'>Nova Tarefa</Text>
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent borderRadius={36} className={styles.newTask}>
          <ModalHeader className={styles.modalHeader}>
            <Stack
              display='flex'
              alignItems='center'
              flexWrap='wrap'
              spacing={2}
            >
              <Text
                display='flex'
                marginRight='50%'
                alignItems='center'
                flexWrap='wrap'
                className={styles.textHeader}
              >
                <AiOutlineCheckCircle /> <span margin-left='2px' /> Nova tarefa
              </Text>
              <ModalCloseButton size='22' color='#FFFFFF' />
            </Stack>
          </ModalHeader>

          <ModalBody pb={6} alignItems='center'>
            <Stack alignItems='center' className={styles.stackData}>
              <form
                id='newTask'
                onSubmit={handleSubmit(async data => {
                  try {
                    const response = await createTask({
                      name: data.name,
                      responsible: data.responsible,
                      completionDate: data.completionDate,
                    });

                    await getTasks();
                  } catch (err) {
                    if (err.graphQLErrors[0].message === 'User not found') {
                      setAlertInvalid(
                        'E-mail ou senha inválidos. Tente novamente.'
                      );
                    }
                  }
                })}
              >
                <FormLabel
                  marginTop='10%'
                  display='flex'
                  alignItems='center'
                  flexWrap='wrap'
                  htmlFor='name'
                >
                  <FaListUl />
                  <Box marginLeft='2px' />
                  Nome
                </FormLabel>
                <Input
                  bg={bgInput}
                  h='36px'
                  w='304px'
                  size='md'
                  mb='8px'
                  id='nome'
                  placeholder='Nome da tarefa'
                  {...register('name', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                {errors.name && <p>{errors.name.message}</p>}
                <FormLabel
                  display='flex'
                  alignItems='center'
                  flexWrap='wrap'
                  htmlFor='responsaveis'
                >
                  <GoPerson />
                  Responsáveis
                </FormLabel>

                <Select
                  size='md'
                  h='36px'
                  w='304px'
                  mb='8px'
                  bg={bgInput}
                  variant='filled'
                  {...register('responsible')}
                  id='role'
                >
                  {listUsers ? (
                    listUsers.map(user => {
                      return (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      );
                    })
                  ) : (
                    <option value={Roles.ADMIN.valueOf()}>Administrador</option>
                  )}
                </Select>

                {/* <Controller
                  control={control}
                  name='responsible'
                  render={({ field }) => (
                    <Select
                      {...field}
                      className='responsible'
                      value={values.selectedOption}
                      options={listUsers}
                      getOptionValue={option => `${option['id']}`}
                      onChange={handleMultiChange}
                      isMulti
                    />
                  )}
                /> */}

                <FormLabel
                  display='flex'
                  alignItems='center'
                  flexWrap='wrap'
                  htmlFor='completionDate'
                >
                  {' '}
                  <RiCalendarCheckLine /> Entrega
                </FormLabel>
                <Controller
                  control={control}
                  name='completionDate'
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      onChange={date => field.onChange(date)}
                      selected={field.value}
                      dateFormat='dd/MM/yyyy'
                      minDate={new Date()}
                      showYearDropdown
                      scrollableMonthYearDropdown
                      locale='pt'
                      calendarType='US'
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </form>
            </Stack>
          </ModalBody>

          <ModalFooter p='8px' margin='0 auto'>
            <Button
              mb='10%'
              w='180px'
              form='newTask'
              type='submit'
              colorScheme='purple'
              onClick={() =>
                toast({
                  title: 'Tarefa criada com sucesso',
                  description: 'Tarefa criada com sucesso',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                })
              }
            >
              Criar tarefa
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
function setAlertInvalid(arg0: string) {
  throw new Error('Function not implemented.');
}

/* eslint-disable react/jsx-key */
import {
  Avatar,
  background,
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  Input,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import {
  useTable,
  usePagination,
  useRowSelect,
  useColumnOrder,
  useSortBy,
  useFilters,
} from 'react-table';
import { useAuth } from '../contexts/AuthContext';
import styles from '../../styles/Table.module.css';
import tw from 'twin.macro';
import IndeterminateCheckbox from './CheckboxTable';
import { format } from 'date-fns';
import { ColumnFilter } from './ColumnFilter';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react';
import { IconCheckbox } from 'react-icon-checkbox';

export default function TableTasks() {
  //const [tasks, setTasks] = useState([]);
  const [listTasks, setListTasks] = useState([]);
  const { getTasks, tasks } = useAuth();
  const [checked, setChecked] = useState(false);
  //const [iterateTasks, setIterate] = useState(tasks);
  //const iterateTasks = Object.values(tasks);

  useEffect(() => {
    getTasks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _onCheckboxClicked = () => {
    setChecked(!checked);
  };
  const bgTable = useColorModeValue(
    '#F6F7FB 0% 0% no-repeat padding-box',
    '#22242E 0% 0% no-repeat padding-box'
  );

  const data = React.useMemo(
    () => [
      {
        id: 'asfdhtyjeyr',
        name: 'Tarefa 1',
        users: {
          email: 'rtteixeira3@gmail.com',
          name: 'Rafael',
          avatar: 'noPhoto',
          id: '1245rfar',
          role: 'AMDIN',
          company: {
            id: '526TWGTRR',
            companyName: 'Workmize',
            ownerEmail: 'rtteixeira30@gmail.com',
          },
        },
        isDone: false,
        owner: {
          company: {
            id: '526TWGTRR',
            companyName: 'Workmize',
            ownerEmail: 'rtteixeira30@gmail.com',
          },
          role: 'ADMIN',
          email: 'rtteixeira30@gmail.com',
          name: 'Rafael',
          avatar: 'nophoto',
          id: 'qfergwergwr',
        },
        completionDate: Date,
        createdAt: Date,
        updatedAt: Date,
      },

      {
        id: 'asfdhtyjeyre',
        name: 'Tarefa 2',
        users: {
          email: 'rtteixeira3@gmail.com',
          name: 'Rafael',
          avatar: 'noPhoto',
          id: '1245rfar',
          role: 'AMDIN',
          company: {
            id: '526TWGTRR',
            companyName: 'Workmize',
            ownerEmail: 'rtteixeira30@gmail.com',
          },
        },
        isDone: false,
        owner: {
          company: {
            id: '526TWGTRR',
            companyName: 'Workmize',
            ownerEmail: 'rtteixeira30@gmail.com',
          },
          role: 'ADMIN',
          email: 'rtteixeira30@gmail.com',
          name: 'Rafael',
          avatar: 'nophoto',
          id: 'qfergwergwr',
        },
        completionDate: Date,
        createdAt: Date,
        updatedAt: Date,
      },

      {
        id: 'asfdhtyjreyr',
        name: 'Tarefa 3',
        users: {
          email: 'rtteixeira3@gmail.com',
          name: 'Rafael',
          avatar: 'noPhoto',
          id: '1245rfar',
          role: 'AMDIN',
          company: {
            id: '526TWGTRR',
            companyName: 'Workmize',
            ownerEmail: 'rtteixeira30@gmail.com',
          },
        },
        isDone: false,
        owner: {
          company: {
            id: '526TWGTRR',
            companyName: 'Workmize',
            ownerEmail: 'rtteixeira30@gmail.com',
          },
          role: 'ADMIN',
          email: 'rtteixeira30@gmail.com',
          name: 'Rafael',
          avatar: 'nophoto',
          id: 'qfergwergwr',
        },
        completionDate: Date,
        createdAt: Date,
        updatedAt: Date,
      },
    ],

    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Tarefa ',

        accessor: 'name', // accessor is the "key" in the data

        Filter: ColumnFilter,

        Cell: ({ value }) => {
          return (
            <HStack>
              <AiOutlineCheckCircle />

              <Text>{value}</Text>
            </HStack>
          );
        },
      },

      {
        Header: 'Responsáveis',

        accessor: 'users[0].avatar',

        disableFilters: true,
        disableSortBy: true,
        Cell: ({ value }) => {
          return (
            <Avatar
              size='sm'
              name='value'
              src={`https://hiring-api.workmize.com/${value}`}
            />
          );
        },
      },
      {
        Header: 'Data de Entrega',

        accessor: 'completionDate',

        Cell: ({ value }) => {
          let data = new Date();
          let dataCompare = new Date(data);
          let dataInput = new Date(value);
          if (dataInput.getTime() === dataCompare.getTime()) {
            return <Text color='green'>Hoje</Text>;
          } else if (dataInput > data) {
            return <Text>{format(dataInput, 'dd/MM/yyyy')}</Text>;
          } else if (dataInput < data) {
            return <Text>Ontem</Text>;
          }
        },
        disableFilters: true,

        disableSortBy: true,
      },
    ],

    []
  );

  const tasksData = useMemo(() => [...tasks], [tasks]);

  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

  const {
    getTableProps,

    getTableBodyProps,

    headerGroups,

    page,

    nextPage,

    previousPage,

    prepareRow,

    canNextPage,

    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    selectedFlatRows,

    state,
  } = useTable(
    tasks
      ? {
          columns: columns,
          data: tasksData,
          initialState: { pageSize: 7 },
          defaultColumn,
        }
      : { columns, data },

    hooks => {
      hooks.visibleColumns.push(columns => {
        return [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div style={{ maxWidth: '5px' }}>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div style={{ maxWidth: '5px' }}>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ];
      });
    },

    useFilters,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const { pageIndex } = state;

  const isEven = idx => idx % 2 === 0;

  const firstPageRows = page.slice(0, 7);

  return (
    <>
      <table
        {...getTableProps()}
        cellSpacing='0'
        style={{
          backgroundColor: 'bgTable',
          position: 'relative',
          top: '6%',
          width: '90%',
          height: '80%',
          margin: '0 auto',
          overflow: 'hidden',
          borderCollapse: 'separate',
          border: '1px solid',
          borderRadius: '25px',
          //tableLayout: 'fixed',
          font: 'normal normal medium 14px/19px Inter',
          letterSpacing: '0px',
          lineHeight: '1.5rem',
          //color: 'rgba(17, 24, 39, var(--tw-text-opacity))',
        }}
      >
        <thead
          style={{
            padding: '2px',
            height: '45px',
            //borderBottom: '1px solid',
            //borderRadius: '25px',
          }}
        >
          {headerGroups.map(headerGroup => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              style={{ padding: '2px' }}
            >
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    justifyContent: 'space-between',
                    borderRight: '1px solid #AAAAAA',
                    borderBottom: '1px solid #AAAAAA',

                    textAlign: 'left',

                    padding: '2px',
                  }}
                >
                  {column.render('Header')}

                  <HStack alignItems='center'>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <IoMdArrowDropdown />
                      ) : (
                        <IoMdArrowDropup />
                      )
                    ) : (
                      ''
                    )}
                    {column.canFilter ? column.render('Filter') : null}
                  </HStack>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, idx) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()} style={{ padding: '2px' }}>
                {row.cells.map(cell => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <td
                      {...cell.getCellProps()}
                      style={
                        isEven(idx)
                          ? {
                              height: '55px',

                              //border: 'solid 1px gray',

                              background: '#F9F9FB',
                            }
                          : {
                              height: '55px',

                              //border: 'solid 1px gray',
                              background: '#F2F2F2',
                            }
                      }
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* {<pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: console.log(
                selectedFlatRows.map(row => row.original)
              ) 
            },
            null,
            2
          )}
        </code>
      </pre>} */}

      <HStack
        display='flex'
        justifyContent='space-around'
        alignItems='center'
        spacing='30%'
        marginTop='4%'
      >
        <Button
          width='150px'
          height='40px'
          background='#a0aec0 0% 0% no-repeat padding-box'
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          colorScheme='#F8F8F8'
        >
          Anterior
        </Button>
        <Text>
          Página{' '}
          <strong>
            <input
              id='paginationInput'
              style={{
                width: '34px',
                borderRadius: '5px',
                backgroundColor: '#FFFFFF 0% 0% no-repeat padding-box',
                textAlign: 'center',
                boxShadow: '0px 2px 5px #0000001C',
              }}
              type='number'
              defaultValue={pageIndex + 1}
              onChange={e => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
            />{' '}
            de {pageOptions.length}
          </strong>
        </Text>{' '}
        <Button
          width='150px'
          height='40px'
          background='#a0aec0 0% 0% no-repeat padding-box'
          onClick={() => {
            nextPage();
          }}
          disabled={!canNextPage}
          colorScheme='#F8F8F8'
        >
          Próxima
        </Button>
      </HStack>
    </>
  );
}

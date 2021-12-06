import { SearchIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  function openInput() {}
  return (
    <>
      <IconButton
        variant='filled'
        aria-label='Search database'
        icon={<SearchIcon />}
      />
      <input
        className='hidden-form'
        type='text'
        name='loc'
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
      />
    </>
  );
};

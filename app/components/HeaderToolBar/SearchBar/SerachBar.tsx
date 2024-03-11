'use client';
import React, { memo } from 'react';
import { SearchField } from './SearchField';

const SearchBar = () => {
  return (
    <form className='max-w-md mx-auto'>
      <SearchField />
    </form>
  );
};

export default memo(SearchBar);

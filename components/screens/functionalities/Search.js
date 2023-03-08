import React from 'react';
import { SearchBar } from '@rneui/themed';

const Search = ({ searchQuery, setSearchQuery,onSearch }) => {
  return (
    <SearchBar
    placeholder="Search for ingredients..."
    value={searchQuery}
    onChangeText={setSearchQuery}
    onEndEditing={onSearch}
    lightTheme={true}
    round={true}
    containerStyle={{ backgroundColor: 'white', borderWidth: 0, paddingTop:5 }}
    
    />
  );
};

export default Search;

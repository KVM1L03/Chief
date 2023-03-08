import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import Search from './functionalities/Search';
import RecipeResult from './functionalities/RecipeResult';
import axios from 'axios';
import {API_KEY} from '@env';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=${API_KEY}`
    );
    setRecipes(response.data.results);
  };

  return (
    <View style={{ flex: 1, backgroundColor:'white' }}>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RecipeResult recipe={item} />}
      />
    </View>
  );
};

export default SearchScreen;
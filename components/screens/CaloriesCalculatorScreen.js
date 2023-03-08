import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {API_KEY} from '@env';
import { SearchBar } from '@rneui/themed';
import { Divider } from '@rneui/base';

const CaloriesCalculatorScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  const searchRecipes = async (query) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}`
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
  
    const data = await response.json();
  
    return data.results;
  };

  const getRecipeNutritionById = async (recipeId) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${API_KEY}`
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch recipe nutrition');
    }
  
    const data = await response.json();
  
    return data;
  };
  
  

  const handleSearch = async () => {
    if (searchQuery) {
      try {
        const results = await searchRecipes(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleRecipeSelect = async (recipe) => {
    try {
      const nutrition = await getRecipeNutritionById(recipe.id);
      const recipeWithNutrition = { ...recipe, nutrition };
      setTotalCalories(parseInt(nutrition.calories) + totalCalories );
      setSelectedRecipes([...selectedRecipes, recipeWithNutrition]);
      setSearchResults([]);
      setSearchQuery('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setSelectedRecipes([]);
    setTotalCalories(0);
  };

  const renderRecipeItem = ({ item }) => (
    <View style={styles.recipeItem}>
      <TouchableOpacity style={styles.addButton} onPress={() => handleRecipeSelect(item)}>
        <Icon name="md-add-circle-sharp" size={24} color="green" />
      </TouchableOpacity>
      <Text lineBreakMode='tail'>{item.title}</Text>
      <Divider width={5} color="black"/>
      
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30,fontFamily:'Roboto-Bold' , fontWeight: 'bold', textAlign: 'center', color:'green',marginBottom:20 }}>Count your calories  !</Text>
      <SearchBar
        placeholder="Search for recipes..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        lightTheme={true}
        containerStyle={{ backgroundColor: 'white', borderWidth: 0, paddingTop:5 }} />
      <FlatList
        style={styles.searchResults}
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecipeItem}
      />
      {selectedRecipes.length > 0 && (
        <View style={styles.selectedRecipes}>
          <Text style={styles.totalCalories}>Total Calories: {totalCalories}</Text>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
          <FlatList
            style={styles.selectedRecipesList}
            data={selectedRecipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.selectedRecipeItem}>
                <Text style={styles.selectedRecipeTitle}>{item.title}</Text>
                <Text style={styles.selectedRecipeCalories}>{item.nutrition.calories} calories</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
        
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    
  },
  addButtonText: {
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  caloriesText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  totalCaloriesText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  totalCalories: {
  fontSize: 24,
  fontWeight: 'bold',
  marginTop: 20,
  color:'black',
  textAlign: 'center',
},
recipeItem:{
  flexDirection:'row',
  alignItems:'center'
},
});

export default CaloriesCalculatorScreen

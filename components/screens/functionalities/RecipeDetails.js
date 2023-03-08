import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import {API_KEY} from '@env'


const RecipeDetails = ({ route }) => {
  const { recipeId } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);

  const fetchRecipeDetails = async () => {
    const apiKey = API_KEY;
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
    try {
      const response = await axios.get(url);
      setRecipeDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  if (!recipeDetails) {
    return 
    <View style={{flex: 1,padding: 10,justifyContent: 'center',}}>
      <ActivityIndicator size="large" color="#00ff00"/>
    </View>
    
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Image source={{ uri: recipeDetails.image }} style={styles.image} />
      <Text style={styles.title}>{recipeDetails.title}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{`Prep Time: ${recipeDetails.preparationMinutes} minutes `}</Text>
        <Text style={styles.infoText}>{`Cook Time: ${recipeDetails.cookingMinutes} minutes `}</Text>
        <Text style={styles.infoText}>{`Servings: ${recipeDetails.servings} `}</Text>
      </View>
      <View style={styles.ingredientsContainer}>
        <Text style={styles.sectionTitle}>Ingredients:</Text>
        {recipeDetails.extendedIngredients.map((ingredient) => (
          <Text key={ingredient.id} style={styles.ingredientText}>{`${ingredient.original}`}</Text>
        ))}
      </View>
      <View style={styles.instructionsContainer}>
        <Text style={styles.sectionTitle}>Instructions:</Text>
        {recipeDetails.analyzedInstructions.length > 0 ? (
          recipeDetails.analyzedInstructions[0].steps.map((step) => (
            <View key={step.number} style={styles.stepContainer}>
              <Text style={styles.stepNumber}>{`${step.number} `}</Text>
              <Text textBreakStrategy='simple'  adjustsFontSizeToFit={true} style={styles.stepText}>{`${step.step}`}</Text>
            </View>
          ))
        ) : (
          <Text>No instructions found.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
    
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'green'
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
  },
  ingredientsContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'green'
  },
  ingredientText: {
    fontSize: 16,
    marginBottom: 3,
  },
  instructionsContainer: {
    marginBottom: 10,
    
    
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  stepNumber: {
    fontWeight: 'bold',
    marginRight: 5,
    color:'green'
  },
  stepText: {
    fontSize: 15,
  },
});

export default RecipeDetails;

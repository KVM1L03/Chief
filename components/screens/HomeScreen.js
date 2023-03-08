import { View, Text,TouchableOpacity, Image,Animated } from 'react-native'
import React, { useState } from 'react'
import {API_KEY} from '@env'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AnimatedArrow from './functionalities/AnimatedArrow';





const HomeScreen = () => {

    const navigation = useNavigation();

    const handleRandomRecipe = async () => {
        try {
          const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}`);
          const data = await response.json();
          const { id } = data.recipes[0];
          navigation.navigate('RecipeDetails', { recipeId: id });
        } catch (error) {
          console.error(error);
        }
      };

      

  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', backgroundColor:'white'}}>
    <Text style={{ fontSize: 30,fontFamily:'Roboto-Bold' , fontWeight: 'bold', textAlign: 'center', marginTop: 30, color:'green' }}>Hello, let us to surprise you !</Text>
    <Text style={{fontSize:16}}>Click button below to roll for random recipe</Text>
    <AnimatedArrow />
    <TouchableOpacity
      style={{ backgroundColor: 'green', borderRadius: 50, padding: 15,marginBottom:30 }}
      onPress={() => handleRandomRecipe()}
    >
      <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold',fontSize:20 }}> 🎲 Roll for random recipe !</Text>
    </TouchableOpacity>
  </View>
  )
}

export default HomeScreen
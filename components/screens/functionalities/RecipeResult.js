import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecipeResult = ({ recipe }) => {

    const navigation = useNavigation();

    const handlePress = () => {
    navigation.navigate('RecipeDetails', { recipeId: recipe.id });
    };
    
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: recipe.image }} />
    </View>
    
    <View >
      
      <Text style={styles.title}>{recipe.title}</Text>
      <Text>Calories: {recipe.calories}</Text>
    </View>
    
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 8,
        marginVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    
        elevation: 3,
      },
      imageContainer: {
        width: 80,
        height: 80,
        marginRight: 16,
      },
      image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        color:'green',
        maxWidth:'90%'

      },
});

export default RecipeResult;

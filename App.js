import React from 'react'
import SearchScreen from './components/screens/SearchScreen';
import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/screens/HomeScreen';
import SettingsScreen from './components/screens/CaloriesCalculatorScreen';
import RecipeDetails from './components/screens/functionalities/RecipeDetails';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createStackNavigator } from '@react-navigation/stack';
import CaloriesCalculatorScreen from './components/screens/CaloriesCalculatorScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RecipeDetails" component={RecipeDetails}/>
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SearchStack"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Search" component={SearchScreen} />
      
    </Stack.Navigator>
  );
};

const CaloriesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="CaloriesStack"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Calculator" component={CaloriesCalculatorScreen} />
    </Stack.Navigator>
  );
};


const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown:false,
          tabBarShowLabel:false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeBot') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'SearchBot') {
              iconName = focused ? 'search' : 'search';
            } else if (route.name === 'CaloriesBot') {
              iconName = focused ? 'fire' : 'fire';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'green',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="HomeBot" component={HomeStack} />
        <Tab.Screen name="SearchBot" component={SearchStack} />
        <Tab.Screen name="CaloriesBot" component={CaloriesStack} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonHome from './Pokemons/PokemonHome';
import Pokemon from './Pokemons/Pokemon';

import { types } from './Pokemons/types.js';

const findTypeByName = (keyword) => {
  return types.find((type) => type.name === keyword.toLowerCase());
};


const functionColor = (valor)=>{
  // Example usage
  const fireType = findTypeByName(valor);
  if (fireType) {
      return fireType.darkerColor
  }
}





export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>    
        <Stack.Screen name="Pokemons" component={PokemonHome} />
        <Stack.Screen name="Pokemon" component={Pokemon} options={({ route }) => ({
            title: route.params.data.name, // Set the title based on the passed data
            headerStyle: {
              backgroundColor: functionColor(route.params.data.types[0].type.name), // Set the background color based on the passed data
            },
          })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

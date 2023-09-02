import { View, Text, FlatList, StyleSheet,  TouchableOpacity, Image } from 'react-native';

import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { types } from './types.js';


const findTypeByName = (keyword) => {
  return types.find((type) => type.name === keyword.toLowerCase());
};


const functionColor = (valor)=>{
  // Example usage
  const fireType = findTypeByName(valor);
  if (fireType) {
      return fireType.color
  }
}





const Pokemon = (data) => {
    console.log(data.route.params.data.sprites.front_default)


    
    







  return (
      <View style={[styles.container,{ backgroundColor: functionColor(data.route.params.data.types[0].type.name) }]}>
        <Image source={{ uri: data.route.params.data.sprites.front_default }} style={styles.image} />
        <TouchableOpacity>
          <Text>{data.route.params.data.name}</Text>   
        </TouchableOpacity> 
      </View>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    height: 100,
    borderBottomWidth: 1,
    borderRadius: 8,
    margin: 5,
    borderBottomColor: '#ccc',
    justifyContent: 'space-around',
    paddingLeft: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    width: 300, // example width
    height: 300, // example height
    borderRadius: 25, // example border radius
    resizeMode: 'contain', // example resize mode
  },
  typeContainer: {
      backgroundColor: '#DDDDDD',
      borderRadius: 8,
      paddingVertical: 4,
      paddingHorizontal: 8,
      marginRight: 8,
    },
  types: {
      display: 'flex',
      flexDirection: 'row'
  },
  info: {
      alignItems: 'center',
      justifyContent: 'center'
  }
});





export default Pokemon
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';

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

  const functionColorBackground = (valor)=>{
    // Example usage
    const fireType = findTypeByName(valor);
    if (fireType) {
        return fireType.backgroundColor
    }
  }





const Item = ({background, urlImg, name, data, colors}) => {
    const navigation = useNavigation();

  return (
    <TouchableOpacity
        style={[
          styles.item,
          { backgroundColor: colors || 'transparent' },
        ]}
        onPress={() => {
            navigation.navigate('Pokemon', { data: data });
          }}
      >
        <View style={styles.info}>
            <Text>{name}</Text>
            <Text>{data.id}</Text>
            <View style={styles.types}>
                {data.types.map((type) => (
                    <TouchableOpacity key={type.type.name} style={[styles.typeContainer, { backgroundColor: functionColor(type.type.name) }]} >
                    <Text>{type.type.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

        </View>
        <Image source={{ uri: urlImg }} style={styles.image} />
      </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
   
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
      width: 100, // example width
      height: 100, // example height
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
  

export default Item
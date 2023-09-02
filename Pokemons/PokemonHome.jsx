import React, { useEffect, useState } from 'react';

import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';

import { types } from './types.js';
import Item from './Item.jsx';

const PokemonHome = () => {
  const [data, setData] = useState(null);
  const [offset, setOffset] = useState(0);
  const [pokemonInfo, setPokemonInfo] = useState([]);

  useEffect(() => {
    fetchData();
  }, [offset]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
      const jsonData = await response.json();
      setData(jsonData);
        const informacion = []
      await jsonData.results.map(async (result) => {
        try {
          const infoResponse = await fetch(result.url);
          const infoData = await infoResponse.json();
          await informacion.push(infoData)
        } catch (error) {
          console.log(error);
          return null;
        }
      });
      setPokemonInfo(informacion);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleNext = () => {
    setOffset(offset + 20);
  };

  const handlePrev = () => {
    if (offset >= 20) {
      setOffset(offset - 20);
    }
  };

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

  const renderItem = ({ item, index }) => {
    return (
        <Item background={functionColor(pokemonInfo[index].types[0].type.name)} colors={functionColorBackground(pokemonInfo[index].types[0].type.name)} urlImg={pokemonInfo[index].sprites.front_default} name={item.name} data={item} />
      
    );
  };
  

  return (
    <View style={styles.container}>
      {data ? (
        <>
          <FlatList
            data={pokemonInfo}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
          />
          <View style={styles.buttonContainer}>
            <Button title="Previous 20" onPress={handlePrev} disabled={offset === 0} />
            <Button title="Next 20" onPress={handleNext} />
          </View>
        </>
      ) : (
        <Text>Loading data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  item: {
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
    paddingLeft: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  image: {
    width: 50, // example width
    height: 50, // example height
    borderRadius: 25, // example border radius
    resizeMode: 'contain', // example resize mode
  },
});

export default PokemonHome;

import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React from 'react';

const DrinkTypes = () => {
  const types = [
    {
      id: '0',
      image: require('../image/teaimage/realbubbletea.gif'),
      name: 'Bubble Tea',
    },
    {
      id: '1',
      image: require('../image/teaimage/milkcup.png'),
      name: 'Milk Cup',
    },
    {
      id: '2',
      image: require('../image/teaimage/fruittea.png'),
      name: 'Fruit Tea',
    },
    {
      id: '3',
      image: require('../image/teaimage/puretea.png'),
      name: 'Pure Tea',
    },
    {
      id: '4',
      image: require('../image/teaimage/others.png'),
      name: 'Others',
    },
  ];

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {types.map((item, index) => (
          <View style={{margin: 10}} key={index}>
            <Image
              source={item.image}
              style={{width: 60, height: 60, borderRadius: 30}}
            />
            <Text style={{marginTop: 6, textAlign: 'center'}}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DrinkTypes;

const styles = StyleSheet.create({});

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, ImageBackground, View} from 'react-native';
import {Avatar, Card, IconButton, Searchbar, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const ShopCard = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../image/shop/comebuytea.png')}
          resizeMode="cover"
          style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <IconButton
              icon="chevron-left"
              size={30}
              onPress={() => navigation.goBack()}
            />
            <IconButton
              icon="heart"
              size={30}
              onPress={() => console.log('Pressed')}
            />
          </View>
        </ImageBackground>
        <View style={{flex: 2}}></View>
      </View>
    </View>
  );
};

export default ShopCard;

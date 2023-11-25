import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {firebase} from '@react-native-firebase/database';
import CardUI from './card';
import DrinkTypes from './drinkTypes';

const CardList = () => {
  const navigation = useNavigation();
  const [myData, setMyData] = useState(null);
  useEffect(() => {
    getDatabase();
  }, []);
  const getDatabase = async () => {
    try {
      const data = await firebase
        .app()
        .database(
          'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref('shop/1/location/1')
        .once('value');

      console.log(data);
      setMyData(data.val());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{marginVertical: 5}}>
      <Searchbar
        style={{
          width: Dimensions.get('window').width - 20,
          marginVertical: 10,
          backgroundColor: '#F4E6DC',
        }}
        placeholder="Search"
        value={''}
      />
      <DrinkTypes />
      <CardUI
        name={myData ? myData['addr'] : ''}
        location={myData ? myData['addr'] : ''}
        shopRating={myData ? myData['rating'] : 0}
      />
    </View>
  );
};

export default CardList;

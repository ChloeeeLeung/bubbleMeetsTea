import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {
  Avatar,
  Card,
  IconButton,
  Searchbar,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import database, {firebase} from '@react-native-firebase/database';
import ShopCard from './shopCard';
import CardUI from './card';

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
      <CardUI
        name={myData ? myData['addr'] : ''}
        location={myData ? myData['addr'] : ''}
        shopRating={myData ? myData['rating'] : 0}
      />
    </View>
  );
};

export default CardList;

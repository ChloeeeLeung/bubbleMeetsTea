import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, ScrollView, Text, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {firebase} from '@react-native-firebase/database';
import CardUI from './card';
import DrinkTypes from './drinkTypes';

const CardList = () => {
  const [myData, setMyData] = useState(null);
  const [list, setList] = useState(null);

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
        .ref('shop')
        .once('value');

      setMyData(data.val());
      setList(data.val());
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
      {/* <DrinkTypes /> */}
      <View style={{flexGrow: 1}}>
        <FlatList
          data={list}
          renderItem={item => {
            console.log(item);
            if (item.item !== null) {
              return (
                <View style={{paddingVertical: 5}}>
                  <CardUI
                    name={item.item.name}
                    location={item.item.addr}
                    shopRating={item.item.rating}
                    fav={item.item.fav}
                  />
                </View>
              );
            }
            return null;
          }}
        />
      </View>
    </View>
  );
};

export default CardList;

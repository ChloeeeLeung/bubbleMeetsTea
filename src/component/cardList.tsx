import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {firebase} from '@react-native-firebase/database';
import CardUI from './card';
import {getDistance, getPreciseDistance} from 'geolib';

const CardList = ({
  userLatitude,
  userLongitude,
}: {
  userLatitude: number;
  userLongitude: number;
}) => {
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

      setList(data.val());
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleFavorite = async (itemId: any, itemFav: any) => {
    await firebase
      .app()
      .database(
        'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`shop/${itemId}`)
      .update({
        fav: !itemFav,
      });

    await getDatabase();
  };

  return (
    <View style={{marginVertical: 5, flex: 1, paddingHorizontal: 10}}>
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
      <FlatList
        data={list}
        renderItem={item => {
          //console.log(item);
          let distance = null;
          if (
            item.item !== null &&
            item.item.latitude !== null &&
            item.item.longitude !== null
          ) {
            distance =
              getPreciseDistance(
                {latitude: userLatitude, longitude: userLongitude},
                {latitude: item.item.latitude, longitude: item.item.longitude},
              ) / 1000;
          }
          if (item.item !== null) {
            return (
              <View style={{paddingVertical: 5}}>
                <CardUI
                  name={item.item.name}
                  location={item.item.addr}
                  shopRating={item.item.rating}
                  fav={item.item.fav}
                  openTime={item.item.openTime}
                  closeTime={item.item.closeTime}
                  telephone={item.item.telephone}
                  handleToggleFavorite={() =>
                    handleToggleFavorite(item.index, item.item.fav)
                  }
                  distance={distance}
                />
              </View>
            );
          }
          return null;
        }}
      />
    </View>
  );
};

export default CardList;

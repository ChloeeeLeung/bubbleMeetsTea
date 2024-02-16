import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {firebase} from '@react-native-firebase/database';
import CardUI from './card';
import {getPreciseDistance} from 'geolib';
import Auth from '@react-native-firebase/auth';

const databaseUrl =
  'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/';

export default function CardList({
  userLatitude,
  userLongitude,
}: {
  userLatitude: number;
  userLongitude: number;
}) {
  const [list, setList] = useState(null);

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {
      const id = Auth().currentUser?.uid??'';
      const check = await firebase.app().database(databaseUrl).ref('user').orderByChild('id').equalTo(id)
      .once('value');
      const snapshotValue = check.val();

      if (snapshotValue) {
        const keys = Object.keys(snapshotValue);
        console.log('keys' + keys);
        if (keys.length > 0) {
          const key = keys[1];
          const data = await firebase
            .app()
            .database(databaseUrl)
            .ref(`user/${key}/shop`)
            .once('value');
          console.log(data.val());
          const shopData = data.val();

          const sortedList = shopData
            .filter(Boolean)
            .sort(
              (a: {recommend: number}, b: {recommend: number}) =>
                b.recommend - a.recommend,
            );

          setList(sortedList);
        } else {
          console.log("No user found for the provided ID");
        }
      } else {
        console.log("Snapshot value is null or undefined");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleFavorite = async (itemId: number, itemFav: boolean) => {
    if (itemId !== undefined) {
      const id = Auth().currentUser?.uid??'';
      const check = await firebase.app().database(databaseUrl).ref('user').orderByChild('id').equalTo(id)
      .once('value');
      const snapshotValue = check.val();

      if (snapshotValue) {
        const keys = Object.keys(snapshotValue);
        if (keys.length > 0) {
          const key = keys[0];
          await firebase.app().database(databaseUrl).ref(`user/${key}/shop/${itemId}`).update({
            fav: !itemFav,
          });
          await getDatabase();
        } else {
          console.log("No user found for the provided ID");
        }
      } else {
        console.log("Snapshot value is null or undefined");
      }
    }
  };

  const updateDatabaseRecommend = async (
    itemId: number,
    itemDistance: number,
    itemRating: number,
  ) => {
    await firebase.app().database(databaseUrl).ref(`shop/${itemId}`).update({
      distance: itemDistance,
    });

    let distanceBuff;
    if (itemDistance > 1.5) {
      distanceBuff = -(itemDistance - 1.5) * 10;
    } else {
      distanceBuff = (1.5 - itemDistance) * 10;
    }
    const buff = distanceBuff + itemRating * 10;

    await firebase.app().database(databaseUrl).ref(`shop/${itemId}`).update({
      recommend: buff,
    });
  };

  return (
    <View style={{marginVertical: 5, flex: 1, paddingHorizontal: 10}}>
      <Searchbar
        style={{
          width: Dimensions.get('window').width - 20,
          marginVertical: 10,
          backgroundColor: '#AEB6AE',
        }}
        placeholder="Search"
        value={''}
      />
      {/* <DrinkTypes /> */}
      <FlatList
        data={list}
        renderItem={item => {
          //console.log(item);
          // let distance = null;
          // if (
          //   item.item !== null &&
          //   item.item.latitude !== null &&
          //   item.item.longitude !== null &&
          //   item.item.id !== undefined
          // ) {
          //   distance =
          //     getPreciseDistance(
          //       {latitude: userLatitude, longitude: userLongitude},
          //       {latitude: item.item.latitude, longitude: item.item.longitude},
          //     ) / 1000;
          //   updateDatabaseRecommend(item.item.id, distance, item.item.rating);
          // }
          if (item.item !== null) {
            return (
              <View style={{paddingVertical: 5, marginBottom: 5}}>
                <CardUI
                  name={''}
                  location={''}
                  shopRating={0}
                  fav={item.item.fav}
                  openTime={''}
                  closeTime={''}
                  telephone={0}
                  handleToggleFavorite={() =>
                    handleToggleFavorite(item.item.id, item.item.fav)
                  }
                  distance={item.item.distance}
                />
              </View>
            );
          }
          return null;
        }}
      />
    </View>
  );
}

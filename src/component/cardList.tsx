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
  const [list, setList] = useState([]);
  const [shopList, setShopList] = useState([]);
  const [finalList, setFinalList] = useState<[] | any[]>([]);
  const [visibleData, setVisibleData] = useState(10);

  const getDatabase = async () => {
    try {
      const id = Auth().currentUser?.uid ?? '';
      const getUserID = await firebase
        .app()
        .database(databaseUrl)
        .ref('user')
        .orderByChild('id')
        .equalTo(id)
        .once('value');
      const userID = getUserID.val();

      if (userID) {
        const keys = Object.keys(userID);
        if (keys.length > 0) {
          const key = keys[1];
          const data = await firebase
            .app()
            .database(databaseUrl)
            .ref(`user/${key}/shop`)
            .once('value');
          // console.log(data.val());
          const shopData = data.val();

          const sortedList = shopData
            .filter(Boolean)
            .sort(
              (a: {recommend: number}, b: {recommend: number}) =>
                b.recommend - a.recommend,
            );

          setList(sortedList);

          const getShopInfo = await firebase
            .app()
            .database(databaseUrl)
            .ref('shop')
            .once('value');
          const shopInfo = getShopInfo.val();
          setShopList(shopInfo);
        } else {
          console.log('No user found for the provided ID');
        }
      } else {
        console.log('Snapshot value is null or undefined');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDatabase();
  }, []);

  useEffect(() => {
    if (shopList.length > 0 && list.length > 0) {
      const combinedList = list.map((item: any) => {
        const shopItem = shopList.find(
          (shopItem: any) => shopItem && shopItem.id === item.id,
        );
        return {...item, ...(shopItem || {})};
      });
      setFinalList(combinedList);
    }
  }, [list, shopList]);

  const handleToggleFavorite = async (itemId: number, itemFav: boolean) => {
    if (itemId !== undefined) {
      const id = Auth().currentUser?.uid ?? '';
      const getUserID = await firebase
        .app()
        .database(databaseUrl)
        .ref('user')
        .orderByChild('id')
        .equalTo(id)
        .once('value');
      const userID = getUserID.val();
      console.log(itemId);
      console.log(itemFav);

      if (userID) {
        const keys = Object.keys(userID);
        if (keys.length > 0) {
          const key = keys[1];
          console.log(key);
          await firebase
            .app()
            .database(databaseUrl)
            .ref(`user/${key}/shop/${itemId}`)
            .update({
              fav: !itemFav,
            });
          await getDatabase();
        } else {
          console.log('No user found for the provided ID');
        }
      } else {
        console.log('Snapshot value is null or undefined');
      }
    }
  };

  const updateDatabaseRecommend = async (
    itemId: number,
    itemDistance: number,
    itemRating: number,
  ) => {
    const id = Auth().currentUser?.uid ?? '';
    const getUserID = await firebase
      .app()
      .database(databaseUrl)
      .ref('user')
      .orderByChild('id')
      .equalTo(id)
      .once('value');
    const userID = getUserID.val();

    if (userID) {
      const keys = Object.keys(userID);
      if (keys.length > 0) {
        const key = keys[1];
        await firebase
          .app()
          .database(databaseUrl)
          .ref(`user/${key}/shop/${itemId}`)
          .update({
            distance: itemDistance,
          });

        let distanceBuff;
        if (itemDistance > 1.5) {
          distanceBuff = -(itemDistance - 1.5) * 10;
        } else {
          distanceBuff = (1.5 - itemDistance) * 10;
        }
        const buff = distanceBuff + itemRating * 10;

        await firebase
          .app()
          .database(databaseUrl)
          .ref(`user/${key}/shop/${itemId}`)
          .update({
            recommend: buff,
          });
      } else {
        console.log('No user found for the provided ID');
      }
    } else {
      console.log('Snapshot value is null or undefined');
    }
  };

  const handleEndReached = () => {
    if (visibleData < finalList.length) {
      setVisibleData(visibleData + 10);
    }
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
        data={finalList !== null ? finalList.slice(0, visibleData) : []}
        renderItem={({item}) => {
          // console.log(item);
          let distance = null;
          if (
            item !== null &&
            item.latitude !== null &&
            item.longitude !== null &&
            item.id !== undefined
          ) {
            distance =
              getPreciseDistance(
                {latitude: userLatitude, longitude: userLongitude},
                {latitude: item.latitude, longitude: item.longitude},
              ) / 1000;
            updateDatabaseRecommend(item.id, distance, item.rating);
          }
          if (item !== null) {
            return (
              <View style={{paddingVertical: 5, marginBottom: 5}}>
                <CardUI
                  name={item.name}
                  location={item.addr}
                  shopRating={item.rating}
                  fav={item.fav}
                  openTime={item.openTime}
                  closeTime={item.closeTime}
                  telephone={item.telephone}
                  handleToggleFavorite={() =>
                    handleToggleFavorite(item.id, item.fav)
                  }
                  distance={item.distance}
                  shopID={item.shopID}
                  id={item.id}
                />
              </View>
            );
          }
          return null;
        }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

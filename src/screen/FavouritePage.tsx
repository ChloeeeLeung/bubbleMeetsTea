import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import CardUI from '../component/card';
import {firebase} from '@react-native-firebase/database';
import Auth from '@react-native-firebase/auth';

const databaseUrl =
  'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/';

export default function FavouritePage() {
  const [list, setList] = useState([]);
  const [shopList, setShopList] = useState([]);
  const [finalList, setFinalList] = useState<[] | any[]>([]);

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
          const shopData = data.val();

          const sortedList = shopData
            .filter(Boolean)
            .sort(
              (a: {recommend: number}, b: {recommend: number}) =>
                b.recommend - a.recommend,
            );
          const favList = sortedList.filter((item: { fav: boolean; }) => item.fav === true);
          setList(favList);

          const getShopInfo = await firebase
            .app()
            .database(databaseUrl)
            .ref('branch')
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
      if (userID) {
        const keys = Object.keys(userID);
        if (keys.length > 0) {
          const key = keys[1];
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

  return (
    <SafeAreaView style={{flex: 1, padding: 10}}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favourite</Text>
      </View>
      <FlatList
        data={finalList !== null ? finalList : []}
        renderItem={({item}) => {
          if (item !== null && item.fav === true) {
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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'serif',
    color: '#3b414c',
    marginBottom: 10,
    marginTop: 15,
    paddingLeft: 5,
  },
  row: {
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: 'center',
  },
});

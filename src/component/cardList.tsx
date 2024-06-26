import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
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
  const [shopPhotoList, setPhotoList] = useState([]);
  const [allShopList, setAllShopList] = useState<[] | any[]>([]);
  const [showList, setShowList] = useState<[] | any[]>([]);
  const [visibleData, setVisibleData] = useState(10);
  const [search, setSearch] = useState('');

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
        console.log(keys);
        if (keys.length > 0) {
          const key = keys[1] != undefined ? keys[1] : keys[0];
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
            .ref('branch')
            .once('value');
          const shopInfo = getShopInfo.val();
          setShopList(shopInfo);

          const getShopPhoto = await firebase
            .app()
            .database(databaseUrl)
            .ref('shop')
            .once('value');
          const shopPhoto = getShopPhoto.val();
          setPhotoList(shopPhoto);
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
    if (shopList.length > 0 && list.length > 0 && shopPhotoList.length > 0) {
      const combinedList = list.map((item: any) => {
        const shopItem = shopList.find(
          (shopItem: any) => shopItem && shopItem.id === item.id,
        );
        return {...item, ...(shopItem || {})};
      });
      const finalCombinedList = combinedList.map((item: any) => {
        const final = shopPhotoList.find(
          (final: any) => final && final.shopID === item.shopID,
        );
        return {...item, ...(final || {})};
      });
      finalCombinedList.map((item: any) => {
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
        return null;
      });
      setAllShopList(finalCombinedList);
      setShowList(finalCombinedList);
    }
  }, [list, shopList, shopPhotoList]);

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
          const key = keys[1] != undefined ? keys[1] : keys[0];
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
        const key = keys[1] != undefined ? keys[1] : keys[0];
        await firebase
          .app()
          .database(databaseUrl)
          .ref(`user/${key}/shop/${itemId}`)
          .update({
            distance: itemDistance,
          });

        let initial = 100;

        let distanceBuff;
        if (itemDistance > 1.5) {
          distanceBuff = -(itemDistance - 1.5) * 10;
        } else {
          distanceBuff = (1.5 - itemDistance) * 10;
        }
        const buff = initial + distanceBuff + itemRating * 10;

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
    if (visibleData < showList.length) {
      setVisibleData(visibleData + 10);
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchbar}
        placeholder="Search"
        onChangeText={value => {
          setSearch(value);
          const searchList = allShopList.filter(item =>
            item.shopName.toLowerCase().includes(search),
          );
          setShowList(searchList);
          if (value == '') {
            setShowList(allShopList);
          }
        }}
        onClearIconPress={() => {
          setShowList(allShopList);
        }}
        value={search}
      />
      <FlatList
        data={showList !== null ? showList.slice(0, visibleData) : []}
        renderItem={({item}) => {
          if (item !== null) {
            return (
              <View style={styles.cardMargin}>
                <CardUI
                  logo={item.shopLogo}
                  menu={item.shopMenu}
                  name={item.shopName}
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

const styles = StyleSheet.create({
  searchbar: {
    width: Dimensions.get('window').width - 20,
    marginVertical: 10,
    backgroundColor: '#AEB6AE',
  },
  container: {
    marginVertical: 5,
    flex: 1,
    paddingHorizontal: 10,
  },
  cardMargin: {
    paddingVertical: 5,
    marginBottom: 5,
  },
});

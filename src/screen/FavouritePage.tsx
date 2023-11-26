import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import CardUI from '../component/card';
import {firebase} from '@react-native-firebase/database';

const FavouritePage = () => {
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
    <SafeAreaView style={{flex: 1, padding: 10}}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favourite</Text>
      </View>
      <FlatList
        data={list}
        renderItem={item => {
          if (item.item !== null && item.item.fav == true) {
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 6,
  },
});

export default FavouritePage;

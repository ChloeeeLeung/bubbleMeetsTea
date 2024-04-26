import React, { useEffect, useState } from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import ExploreCard from '../component/exploreCard';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/database';

const databaseUrl =
  'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/';

export default function ExplorePage() {
  const navigation = useNavigation();
  
  const [postList, setPostList] = useState<[]|any>([]);
  const [test, setText] = useState();

  const getExplore = async () => {
    try {
      const exploreData = await firebase
        .app()
        .database(databaseUrl)
        .ref('explore')
        .once('value');
      const List = exploreData.val();
      setPostList( List );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect( () =>
  {
    getExplore();
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <IconButton
          icon="plus"
          size={20}
          iconColor="#FFFFFF"
          containerColor="#2f4858"
          onPress={() => {
            navigation.navigate('PostPage');
          }}
          style={styles.addPost}
        />
      </View>
      <FlatList
        data={postList !== null ? postList : []}
        renderItem={ ( { item } ) =>
        {
          // const shopID = item.shopID;
          // console.log( shopID );
          // const shop = firebase
          //   .app()
          //   .database(databaseUrl)
          //   .ref('shop')
          //   .orderByChild('id')
          //   .equalTo(shopID)
          //   .once( 'value' );          
          // console.log(test)
          if (item !== null) {
            return (
              <View style={styles.cardMargin}>
                <ExploreCard title={ item.title } postTime={ item.postTime } content={ item.content } like={ item.like } rate={ item.rate } photoURL={item.photoURL} />
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
    flex: 1,
    padding: 10,
  },
  header: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  addPost: {
    width: 150,
  },
  cardMargin: {
    paddingVertical: 5,
    marginBottom: 5,
  }
});

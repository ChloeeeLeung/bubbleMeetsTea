import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import ExploreCard from '../component/exploreCard';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/database';
import Auth from '@react-native-firebase/auth';

const databaseUrl =
  'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/';

export default function ExplorePage() {
  const navigation = useNavigation();

  const [postList, setPostList] = useState<[] | any>([]);
  const [isBlogger, setIsBlogger] = useState(false);

  const getExplore = async () => {
    try {
      const exploreData = await firebase
        .app()
        .database(databaseUrl)
        .ref('explore')
        .once('value');
      const List = exploreData.val();
      setPostList(List);
    } catch (err) {
      console.log(err);
    }
  };

  const checkBlogger = async () => {
    try {
      const blogger = await firebase
        .app()
        .database(databaseUrl)
        .ref('user')
        .orderByChild('id')
        .equalTo(Auth().currentUser?.uid ?? '')
        .once('value');
      const bloggerInfo = blogger.val();
      setIsBlogger(bloggerInfo[1]?.blogger ?? false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getExplore();
  }, [postList]);

  useEffect(() => {
    checkBlogger();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        {isBlogger && (
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
        )}
      </View>
      <FlatList
        data={postList !== null ? postList : []}
        renderItem={({item}) => {
          if (item !== null) {
            return (
              <View style={styles.cardMargin}>
                <ExploreCard
                  title={item.title}
                  postTime={item.postTime}
                  content={item.content}
                  like={item.like}
                  rate={item.rate}
                  photoURL={item.photoURL}
                  id={item.shopID}
                  bloggerID={item.bloggerID}
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
  },
});

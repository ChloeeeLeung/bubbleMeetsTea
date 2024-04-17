import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import ExploreCard from '../component/exploreCard';
import {useNavigation} from '@react-navigation/native';

export default function ExplorePage() {
  const navigation = useNavigation();

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
      <ExploreCard />
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
});

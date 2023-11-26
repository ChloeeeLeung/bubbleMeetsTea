import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import CardUI from '../component/card';

const FavouritePage = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Favourite</Text>
        </View>
        <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
          <CardUI name={''} location={''} shopRating={0} />
        </View>
        <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
          <CardUI name={''} location={''} shopRating={0} />
        </View>
        <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
          <CardUI name={''} location={''} shopRating={0} />
        </View>
        <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
          <CardUI name={''} location={''} shopRating={0} />
        </View>
        <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
          <CardUI name={''} location={''} shopRating={0} />
        </View>
        <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
          <CardUI name={''} location={''} shopRating={0} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  header: {
    paddingLeft: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 6,
  },
});

export default FavouritePage;

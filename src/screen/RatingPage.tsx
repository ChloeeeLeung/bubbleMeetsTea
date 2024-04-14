import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import CardList from '../component/cardList';

export default function RatingPage({
  userLatitude,
  userLongitude,
}: {
  userLatitude: number;
  userLongitude: number;
}) {
  return (
    <>
      <View style={styles.row}>
        <Image
          source={require('../image/bubbletea.png')}
          style={{width: 65, height: 65}}
        />
        <Image
          source={require('../image/font/appNameBrown.png')}
          style={styles.appName}
        />
      </View>
      <CardList userLatitude={userLatitude} userLongitude={userLongitude} />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'serif',
    marginLeft: 8,
    color: '#3D4A3D',
    letterSpacing: 1.1,
  },
  tapContainer: {
    backgroundColor: '#c4c1c4',
  },
  appName: {
    width: 260,
    height: 50,
  },
});

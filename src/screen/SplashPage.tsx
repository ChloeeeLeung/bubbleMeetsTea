import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      Auth().onAuthStateChanged(user => {
        const routeName = user !== null ? 'HomePage' : 'LoginPage';
        navigation.dispatch(StackActions.replace(routeName));
      });
    }, 3000);
    return () => {};
  });

  return (
    <View style={styles.centered}>
      <FastImage
        source={require('../image/realbubbletea.gif')}
        style={styles.loadingGif}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingGif: {
    width: 200,
    height: 200,
  },
});

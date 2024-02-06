import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';

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
    <View>
      <Text>123</Text>
    </View>
  );
}

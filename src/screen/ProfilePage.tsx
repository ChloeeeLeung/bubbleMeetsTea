import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Text} from 'react-native-paper';

const ProfilePage = () => {
  const navigation = useNavigation();
  return (
    <Button mode="elevated" onPress={() => navigation.navigate('LoginPage')}>
      Log out
    </Button>
  );
};

export default ProfilePage;

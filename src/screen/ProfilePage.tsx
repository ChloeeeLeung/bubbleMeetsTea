import React from 'react';
import {Button, Text} from 'react-native-paper';

const ProfilePage = () => {
  return (
    <Button mode="elevated" onPress={() => console.log('Pressed')}>
      Log out
    </Button>
  );
};

export default ProfilePage;

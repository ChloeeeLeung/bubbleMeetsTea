import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {Button} from 'react-native-paper';

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Caveat',
  },
  startButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: '#25171c',
  },
  buttonSide: {
    paddingVertical: 12,
    width: 200,
    height: 80,
  },
  getStart: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

const WelcomPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.view}>
      <Image
        source={require('./bubbletea.png')}
        style={{width: 200, height: 200}}
      />
      <Text style={styles.appName}>Bubble Meets Tea</Text>
      <View style={styles.buttonSide}>
        <Button
          mode="outlined"
          buttonColor="#25171c"
          onPress={() => {
            navigation.navigate('HomePage');
          }}>
          <Text style={styles.getStart}>START</Text>
        </Button>
      </View>
    </View>
  );
};

export default WelcomPage;

import {Button, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {Colors} from 'react-native/Libraries/NewAppScreen';

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
      <Image source={require('./Icon.png')} style={{width: 350, height: 200}} />
      <Text style={styles.appName}>Bubble Meets Tea</Text>
      <View style={styles.buttonSide}>
        <Pressable
          style={styles.startButton}
          onPress={() => {
            navigation.navigate('HomePage');
          }}>
          <Text style={styles.getStart}>START</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WelcomPage;

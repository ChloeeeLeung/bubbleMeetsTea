import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {Button} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import {TabBar} from 'react-native-tab-view';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontFamily: 'Caveat',
  },
});

const WelcomPage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <View style={styles.centered}>
      <Image
        source={require('../image/bubbletea.png')}
        style={{width: 200, height: 200}}
      />
      <Text style={styles.appName}>Bubble Meets Tea</Text>
      <View style={styles.buttonSide}>
        <Button
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

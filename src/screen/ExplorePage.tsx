import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import ExploreCard from '../component/exploreCard';
import {firebase} from '@react-native-firebase/database';
import {getPreciseDistance} from 'geolib';
import {
  CameraType,
  MediaType,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export default function ExplorePage() {
  let options = {
    mediaType: 'photo' as MediaType,
    cameraType: 'back' as CameraType,
    durationLimit: 5,
    saveToPhotos: true,
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options, result => {});
    }
  };

  return (
    <SafeAreaView style={{flex: 1, padding: 10}}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <ExploreCard></ExploreCard>
        <Button icon="camera" mode="contained" onPress={openCamera}>
          Press me
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  header: {
    marginBottom: 12,
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
  row: {
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: 'center',
  },
});

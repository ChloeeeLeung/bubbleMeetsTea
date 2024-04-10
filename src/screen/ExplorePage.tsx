import React, { useState } from 'react';
import {PermissionsAndroid, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import ExploreCard from '../component/exploreCard';
import {
  CameraType,
  MediaType,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export default function ExplorePage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, handleResponse);
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, handleResponse);
  };

  const handleResponse = (response: any) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setSelectedImage(imageUri);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, padding: 10}}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <ExploreCard/>
        <Button icon="camera" mode="contained" onPress={handleCameraLaunch}>
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

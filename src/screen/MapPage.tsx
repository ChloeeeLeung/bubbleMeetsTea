import React from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Text} from 'react-native-paper';

const MapPage = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        initialRegion={{
          latitude: 22.302711,
          longitude: 114.177216,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}></MapView>
    </SafeAreaView>
  );
};

export default MapPage;

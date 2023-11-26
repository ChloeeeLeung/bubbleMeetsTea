import React from 'react';
import {SafeAreaView} from 'react-native';
import GetLocation from 'react-native-get-location';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import FavouritePage from './FavouritePage';

const MapPage = () => {
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);

  GetLocation.getCurrentPosition({
    enableHighAccuracy: false,
    timeout: 60000,
  })
    .then(location => {
      setLatitude(location.latitude);
      setLongitude(location.longitude);
      console.log(location);
    })
    .catch(error => {
      const {code, message} = error;
      console.warn(code, message);
    });

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        initialRegion={{
          latitude: latitude == 0 ? 22.302711 : latitude,
          longitude: longitude == 0 ? 114.177216 : longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}>
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}></Marker>
      </MapView>
    </SafeAreaView>
  );
};

export default MapPage;

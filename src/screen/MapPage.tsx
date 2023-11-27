import {firebase} from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text} from 'react-native';
import GetLocation from 'react-native-get-location';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

const MapPage = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const [list, setList] = useState(null);

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {
      const data = await firebase
        .app()
        .database(
          'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref('shop')
        .once('value');

      setList(data.val());
    } catch (err) {
      console.log(err);
    }
  };

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
          }}
        />
        {list &&
          (list as any[]).length > 0 &&
          (list as any[]).map((item, index) => {
            console.log(item);
            if (
              item !== null &&
              item.latitude !== null &&
              item.longitude !== null
            ) {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}>
                  <Icon name={'map-pin'} size={35} color={'#F29E18'}></Icon>
                </Marker>
              );
            }
            return null;
          })}
        <Marker
          coordinate={{
            latitude: 22.380118962517653,
            longitude: 114.18740518791564,
          }}>
          <Icon name={'map-pin'} size={35} color={'#F29E18'}></Icon>
        </Marker>
      </MapView>
    </SafeAreaView>
  );
};

export default MapPage;

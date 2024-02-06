import {firebase} from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardUI from '../component/card';
import {getPreciseDistance} from 'geolib';

const databaseUrl =
  'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/';

export default function MapPage({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const [list, setList] = useState<any[]>([]);
  const [card, setCard] = useState(Infinity);
  const [cardContent, setCardContent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {
      const data = await firebase
        .app()
        .database(databaseUrl)
        .ref('shop')
        .once('value');

      setList(data.val() || []);
    } catch (err) {
      console.log(err);
    }
  };

  const test = async (index: number) => {
    if (index !== Infinity) {
      try {
        const data = await firebase
          .app()
          .database(databaseUrl)
          .ref(`shop/${index}`)
          .once('value');

        const shopData = data.val();

        if (shopData) {
          const distance =
            getPreciseDistance(
              {latitude: latitude, longitude: longitude},
              {latitude: shopData.latitude, longitude: shopData.longitude},
            ) / 1000;

          setCardContent(
            <View style={{padding: 10}}>
              <CardUI
                name={shopData.name}
                location={shopData.addr}
                shopRating={shopData.rating}
                fav={shopData.fav}
                openTime={shopData.openTime}
                closeTime={shopData.closeTime}
                telephone={shopData.telephone}
                handleToggleFavorite={() => {}}
                distance={distance}
              />
            </View>,
          );
        } else {
          setCardContent(null);
        }
      } catch (error) {
        console.error(error);
        setCardContent(null);
      }
    } else {
      setCardContent(null);
    }
  };

  useEffect(() => {
    test(card);
  }, [card]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        initialRegion={{
          latitude: latitude === 0 ? 22.302711 : latitude,
          longitude: longitude === 0 ? 114.177216 : longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}>
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        />
        {list.map((item, index) => {
          if (
            item !== null &&
            item.latitude !== null &&
            item.longitude !== null
          ) {
            return (
              <Marker
                onPress={() => {
                  setCard(index);
                }}
                key={index}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}>
                <Icon name={'map-pin'} size={35} color={'#2F4858'}></Icon>
              </Marker>
            );
          }
          return null;
        })}
      </MapView>
      {cardContent}
    </SafeAreaView>
  );
}

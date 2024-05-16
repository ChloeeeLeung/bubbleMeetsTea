import {firebase} from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardUI from '../component/card';
import {getPreciseDistance} from 'geolib';
import Auth from '@react-native-firebase/auth';

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
        .ref('branch')
        .once('value');

      setList(data.val() || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleFavorite = async (itemId: number, itemFav: boolean) => {
    if (itemId !== undefined) {
      const id = Auth().currentUser?.uid ?? '';
      const getUserID = await firebase
        .app()
        .database(databaseUrl)
        .ref('user')
        .orderByChild('id')
        .equalTo(id)
        .once('value');
      const userID = getUserID.val();

      if (userID) {
        const keys = Object.keys(userID);
        if (keys.length > 0) {
          const key = keys[1] != undefined ? keys[1] : keys[0];
          await firebase
            .app()
            .database(databaseUrl)
            .ref(`user/${key}/shop/${itemId}`)
            .update({
              fav: !itemFav,
            });
          await getDatabase();
        } else {
          console.log('No user found for the provided ID');
        }
      } else {
        console.log('Snapshot value is null or undefined');
      }
    }
  };

  const getCard = async (index: number) => {
    if (index !== Infinity) {
      try {
        const info = await firebase
          .app()
          .database(databaseUrl)
          .ref('branch')
          .orderByChild('id')
          .equalTo(index)
          .once('value');
        const shopInfo = info.val();

        const shop = Object.values(shopInfo)[0];
        const photo = await firebase
          .app()
          .database(databaseUrl)
          .ref('shop')
          .orderByChild('shopID')
          .equalTo(shop.shopID)
          .once('value');
        const shopPhoto = photo.val();

        let filteredShopPhoto;
        if (Array.isArray(shopPhoto)) {
          const shopPhotoList = shopPhoto.filter(item => item !== null);
          filteredShopPhoto = shopPhotoList[0];
        } else {
          const key = Object.keys(shopPhoto)[0];
          filteredShopPhoto = shopPhoto[key];
        }

        const id = Auth().currentUser?.uid ?? '';
        const getUserID = await firebase
          .app()
          .database(databaseUrl)
          .ref('user')
          .orderByChild('id')
          .equalTo(id)
          .once('value');
        const userID = getUserID.val();

        let userShopInfo;
        if (userID) {
          const keys = Object.keys(userID);
          if (keys.length > 0) {
            const key = keys[1] != undefined ? keys[1] : keys[0];
            const userShop = await firebase
              .app()
              .database(databaseUrl)
              .ref(`user/${key}/shop/${shopInfo[index].id}`)
              .once('value');
            userShopInfo = userShop.val();
          } else {
            console.log('No user found for the provided ID');
          }
        } else {
          console.log('Snapshot value is null or undefined');
        }

        const shopData = {
          ...filteredShopPhoto,
          ...shopInfo[index],
          ...userShopInfo,
        };

        if (shopData) {
          const distance =
            getPreciseDistance(
              {latitude: latitude, longitude: longitude},
              {latitude: shopData.latitude, longitude: shopData.longitude},
            ) / 1000;

          setCardContent(
            <View style={{padding: 10}}>
              <CardUI
                name={shopData.shopName}
                location={shopData.addr}
                shopRating={shopData.rating}
                fav={shopData.fav}
                openTime={shopData.openTime}
                closeTime={shopData.closeTime}
                telephone={shopData.telephone}
                handleToggleFavorite={() => {
                  handleToggleFavorite(shopData.id, shopData.fav);
                }}
                distance={distance}
                shopID={shopData.shopID}
                id={shopData.id}
                logo={shopData.shopLogo}
                menu={shopData.shopMenu}
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
    getCard(card);
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

import {Rating} from '@kolking/react-native-rating';
import React, {useState} from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import DrinkCard from './drinkCard';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ShopInfo from './shopInfo';

const icon1 = '../image/shop/aNiceGift.jpg';
const icon2 = '../image/shop/comebuytea.png';
const icon3 = '../image/shop/sharetea.png';

export default function ShopCard({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const {
    name,
    location,
    shopRating,
    openTime,
    closeTime,
    telephone,
    fav,
    shopID,
    id,
  } = route.params;

  const [index, setIndex] = useState(0);
  const [routes] = useState([{key: 'info'}, {key: 'drinks'}]);

  const renderScene = SceneMap({
    info: () => (
      <ShopInfo
        closeTime={closeTime}
        openTime={openTime}
        location={location}
        telephone={telephone}
        navigation={navigation}
      />
    ),
    drinks: () => <DrinkCard shopID={shopID} id={id} />,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#2f4858'}}
      style={{backgroundColor: '#82919b', height: 2}}
      labelStyle={{fontWeight: 'bold', color: '#ffffff'}}
    />
  );

  return (
    <SafeAreaView style={{flex: 1, padding: 15}}>
      <View style={{justifyContent: 'center'}}>
        <ImageBackground
          source={
            name == 'Comebuytea'
              ? require(icon2)
              : name == 'ShareTea'
              ? require(icon3)
              : require(icon1)
          }
          style={{justifyContent: 'center', height: 250}}
          imageStyle={{borderRadius: 25}}>
          <View
            style={{
              flex: 1,
              top: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <IconButton
              icon="chevron-left"
              size={30}
              onPress={() => navigation.goBack()}
            />
            <IconButton
              icon={fav ? 'heart' : 'heart-outline'}
              iconColor={fav ? '#B22222' : '#2f4858'}
              size={30}
              // onPress={() => handleToggleFavorite()}
            />
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>{name}</Text>
        <Rating
          style={{marginLeft: 20}}
          rating={shopRating}
          size={18}
          disabled={true}
          variant={'stars-outline'}
          fillColor={'#2f4858'}
          baseColor={'#2f4858'}
        />
        <Text style={{textAlign: 'center', marginLeft: 5}}>{shopRating}</Text>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 5,
  },
  button: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 5,
  },
});

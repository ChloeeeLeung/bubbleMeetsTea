import {Rating} from '@kolking/react-native-rating';
import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import DrinkCard from './drinkCard';

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
    handleToggleFavorite,
  } = route.params;

  const iconSize = 23;

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <IconButton
  //         icon={fav ? 'heart' : 'heart-outline'}
  //         iconColor={fav ? '#B22222' : '#2f4858'}
  //         size={30}
  //         onPress={async () => {
  //           handleToggleFavorite();
  //           navigation.navigate('ShopPage');
  //         }}
  //       />
  //     ),
  //   });
  // }, [fav]);

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
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View style={styles.row}>
          <Icon name="sun-o" size={iconSize} color={'#2f4858'} />
          <Text style={{marginLeft: 5}}>Open at {openTime}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="moon-o" size={iconSize} color={'#2f4858'} />
          <Text style={{marginLeft: 5}}>Close at {closeTime}</Text>
        </View>
      </View>
      <Button
        buttonColor="#2f4858"
        icon="book"
        mode="contained"
        onPress={() => navigation.navigate('MenuModal')}>
        Menu
      </Button>
      <View style={styles.row}>
        <Icon name="map-marker" size={iconSize} color={'#2f4858'} />
        <Text style={{marginLeft: 5}}>{location}</Text>
      </View>
      {telephone && (
        <View style={styles.row}>
          <Icon name="phone" size={iconSize} color={'#2f4858'} />
          <Text style={{marginLeft: 5}}>{telephone}</Text>
        </View>
      )}
      <DrinkCard />
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

import {Rating} from '@kolking/react-native-rating';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, View} from 'react-native';
import {
  Avatar,
  IconButton,
  Searchbar,
  Text,
  TouchableRipple,
  Card,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Double} from 'react-native/Libraries/Types/CodegenTypes';

const icon1 = '../image/shop/aNiceGift.jpg';
const icon2 = '../image/shop/comebuytea.png';
const icon3 = '../image/shop/sharetea.png';

export default function CardUI({
  name,
  location,
  shopRating,
  fav,
  openTime,
  closeTime,
  telephone,
  handleToggleFavorite,
  distance,
  shopID,
  id,
}: {
  name: String;
  location: String;
  shopRating: Double;
  fav: boolean;
  openTime: String;
  closeTime: String;
  telephone: Number;
  handleToggleFavorite: () => void;
  distance: any;
  shopID: String;
  id: number;
}) {
  const navigation = useNavigation();
  return (
    <TouchableRipple
      onPress={() =>
        navigation.navigate('ShopCard', {
          name,
          location,
          shopRating,
          openTime,
          closeTime,
          telephone,
          fav,
          handleToggleFavorite,
          shopID,
          id,
        })
      }>
      <Card
        style={{
          backgroundColor: '#C9D5BD',
          width: Dimensions.get('window').width - 20,
        }}>
        <Card.Title
          title={name}
          titleVariant="titleMedium"
          left={props =>
            name == 'Comebuytea' ? (
              <Avatar.Image {...props} source={require(icon2)} />
            ) : name == 'ShareTea' ? (
              <Avatar.Image {...props} source={require(icon3)} />
            ) : (
              <Avatar.Image {...props} source={require(icon1)} />
            )
          }
          right={props => (
            <IconButton
              {...props}
              icon={fav ? 'heart' : 'heart-outline'}
              iconColor={fav ? '#B22222' : '#2f4858'}
              onPress={() => {
                handleToggleFavorite();
              }}
            />
          )}
        />
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 15,
            marginBottom: 5,
          }}>
          <Icon name="map-marker" size={20} color={'#2f4858'} />
          <Text style={{marginLeft: 5}}>{location}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: 15,
            marginVertical: 5,
          }}>
          <Icon name="street-view" size={20} color={'#2f4858'} />
          <Text style={{marginLeft: 5}}>{distance} km</Text>
          <Rating
            style={{
              marginLeft: 20,
            }}
            size={17}
            rating={shopRating}
            disabled={true}
            variant={'stars-outline'}
            fillColor={'#2f4858'}
            baseColor={'#2f4858'}
          />
          <Text style={{marginLeft: 5}}>{shopRating}</Text>
        </View>
      </Card>
    </TouchableRipple>
  );
}

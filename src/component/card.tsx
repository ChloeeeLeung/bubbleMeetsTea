import {Rating} from '@kolking/react-native-rating';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, View} from 'react-native';
import {
  Avatar,
  IconButton,
  Text,
  TouchableRipple,
  Card,
  Menu,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Double} from 'react-native/Libraries/Types/CodegenTypes';

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
  logo,
  menu,
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
  logo: string;
  menu: string;
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
          logo,
          menu,
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
          left={props => (
            <Avatar.Image
              {...props}
              source={{
                uri:
                  logo ??
                  'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              }}
            />
          )}
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
          <Text style={{marginLeft: 5}}>{shopRating?.toFixed(1) ?? 0}</Text>
        </View>
      </Card>
    </TouchableRipple>
  );
}

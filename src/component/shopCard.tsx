import {Rating} from '@kolking/react-native-rating';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Modal,
  Searchbar,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const ShopCard = () => {
  const navigation = useNavigation();

  const [rating, setRating] = useState(0);

  const handleChange = useCallback(
    (value: number) => setRating(Math.round((rating + value) * 5) / 10),
    [rating],
  );

  const iconSize = 23;
  return (
    <View style={{flex: 1, padding: 15, backgroundColor: '#e1e9e1'}}>
      <View style={{justifyContent: 'center'}}>
        <ImageBackground
          source={require('../image/shop/comebuytea.png')}
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
              icon="heart"
              iconColor="#B22222"
              size={30}
              onPress={() => console.log('Pressed')}
            />
          </View>
        </ImageBackground>
      </View>
      <View style={{flex: 3, paddingVertical: 5}}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>Comebuytea</Text>
          <Rating
            style={{marginLeft: 20}}
            rating={4.8}
            size={18}
            disabled={true}
            variant={'stars-outline'}
            fillColor={'#2f4858'}
            baseColor={'#2f4858'}
          />
          <Text style={{textAlign: 'center', marginLeft: 5}}>4.8</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View style={styles.row}>
            <Icon name="sun-o" size={iconSize} color={'#2f4858'} />
            <Text style={{marginLeft: 5}}>Open at 11:00</Text>
          </View>
          <View style={styles.row}>
            <Icon name="moon-o" size={iconSize} color={'#2f4858'} />
            <Text style={{marginLeft: 5}}>Close at 23:00</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Icon name="map-marker" size={iconSize} color={'#2f4858'} />
          <Text style={{marginLeft: 5}}>
            Shop A312, 3/F, New Town Plaza Phase III, 18 Sha Tin Centre Street
          </Text>
        </View>
        <Image
          source={require('../image/menu/comebuytea.jpg')}
          style={{width: 350, height: 200}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 5,
  },
});

export default ShopCard;

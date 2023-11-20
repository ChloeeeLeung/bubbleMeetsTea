import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, View} from 'react-native';
import {
  Avatar,
  Card,
  IconButton,
  Searchbar,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const cardList = () => {
  const navigation = useNavigation();
  return (
    <View style={{marginVertical: 5}}>
      <Searchbar
        style={{
          width: Dimensions.get('window').width - 20,
          marginVertical: 10,
          backgroundColor: '#F4E6DC',
        }}
        placeholder="Search"
        value={''}
      />
      <TouchableRipple onPress={() => console.log('Pressed')}>
        <Card
          style={{
            backgroundColor: '#C9D5BD',
            width: Dimensions.get('window').width - 20,
          }}>
          <Card.Title
            title="Comebuytea"
            titleVariant="titleMedium"
            left={props => (
              <Avatar.Image
                {...props}
                source={require('../image/comebuytea.png')}
              />
            )}
            right={props => (
              <IconButton
                {...props}
                icon="heart"
                iconColor="#B22222"
                onPress={() => {}}
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
            <Text style={{marginLeft: 5}}>
              Shop G03, G/F, T.O.P This is Our Place, 700 Nathan Road, Mong Kok
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginHorizontal: 15,
              marginVertical: 5,
            }}>
            <Icon name="street-view" size={20} color={'#2f4858'} />
            <Text style={{marginLeft: 5}}>450 m</Text>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 30,
              }}>
              <Icon name="star" size={20} color={'#2f4858'} />
              <Icon name="star" size={20} color={'#2f4858'} />
              <Icon name="star" size={20} color={'#2f4858'} />
              <Icon name="star" size={20} color={'#2f4858'} />
              <Icon name="star-o" size={20} color={'#2f4858'} />
              <Text style={{marginLeft: 5}}>4.0</Text>
            </View>
          </View>
        </Card>
      </TouchableRipple>
    </View>
  );
};

export default cardList;

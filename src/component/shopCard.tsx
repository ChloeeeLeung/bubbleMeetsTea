import {Rating} from '@kolking/react-native-rating';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Dialog,
  IconButton,
  Modal,
  Portal,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import RatingDialog from './ratingDialog';

const ShopCard = ({route}: {route: any}) => {
  const navigation = useNavigation();
  const {name, location, shopRating, openTime, closeTime, telephone, fav} =
    route.params;

  // const [visible, setVisible] = React.useState(false);

  // const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);
  // const containerStyle = {backgroundColor: 'white'};

  const [dialogVisible, setDialogVisible] = React.useState(false);
  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  const [starRating, setStarRating] = useState(1);

  const iconSize = 23;
  return (
    <SafeAreaView style={{flex: 1, padding: 15, backgroundColor: '#e1e9e1'}}>
      <RatingDialog visible={dialogVisible} hideDialog={hideDialog} />
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
              icon={fav ? 'heart' : 'heart-outline'}
              iconColor={fav ? '#B22222' : '#2f4858'}
              size={30}
              onPress={() => console.log('Pressed')}
            />
          </View>
        </ImageBackground>
      </View>
      <ScrollView style={{paddingVertical: 5}}>
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
        <View style={styles.row}>
          <Icon name="map-marker" size={iconSize} color={'#2f4858'} />
          <Text style={{marginLeft: 5}}>{location}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" size={iconSize} color={'#2f4858'} />
          <Text style={{marginLeft: 5}}>{telephone}</Text>
        </View>
        <View style={styles.button}>
          <Button
            style={{width: 180}}
            buttonColor="#2f4858"
            icon="book"
            mode="contained"
            onPress={() => navigation.navigate('MenuModal')}>
            Menu
          </Button>
          <Button
            style={{width: 180}}
            buttonColor="#2f4858"
            icon="pencil"
            mode="contained"
            onPress={() => showDialog()}>
            Rating
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    justifyContent: 'space-between',
  },
});

export default ShopCard;

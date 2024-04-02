import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ShopInfo({
  closeTime,
  openTime,
  location,
  telephone,
  navigation,
}: {
  closeTime: String;
  openTime: String;
  location: String;
  telephone: String;
  navigation: any;
}) {
  return (
    <View>
      <View style={styles.infoText}>
        <View style={styles.row}>
          <Icon name="sun-o" size={23} color={'#2f4858'} />
          <Text style={{marginLeft: 5}}>Open at {openTime}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="moon-o" size={23} color={'#2f4858'} />
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
        <Icon name="map-marker" size={23} color={'#2f4858'} />
        <Text style={{marginLeft: 5}}>{location}</Text>
      </View>
      {telephone && (
        <View style={styles.row}>
          <Icon name="phone" size={23} color={'#2f4858'} />
          <Text style={{marginLeft: 5}}>{telephone}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  infoText: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 15,
  },
});

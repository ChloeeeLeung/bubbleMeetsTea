import React, {useEffect, useState} from 'react';
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
  const [hourNow, setHourNew] = useState('');

  useEffect(() => {
    const time = new Date().getTime();
    const date = new Date(time);
    const hour = date.getHours();

    const openHour = parseInt(openTime.split(':')[0], 10);
    const closeHour = parseInt(closeTime.split(':')[0], 10);
    if (
      openHour <= hour && closeHour < 5 ? hour > closeHour : hour < closeHour
    ) {
      const nextHour = hour < 23 ? hour + 1 : hour + 1 - 24;
      const formattedHour = String(hour).padStart(2, '0') + ':00';
      const formattedNextHour = String(nextHour).padStart(2, '0') + ':00';

      setHourNew('Now (' + formattedHour + '-' + formattedNextHour + '): Busy');
    } else {
      setHourNew('Closed');
    }
  }, []);

  return (
    <View>
      <View style={styles.infoText}>
        <View style={styles.row}>
          <Icon name="sun-o" size={23} color={'#2f4858'} />
          <Text style={styles.textMargin}>Open at {openTime}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="moon-o" size={23} color={'#2f4858'} />
          <Text style={styles.textMargin}>Close at {closeTime}</Text>
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
        <Text style={styles.textMargin}>{location}</Text>
      </View>
      {telephone && (
        <View style={styles.row}>
          <Icon name="phone" size={23} color={'#2f4858'} />
          <Text style={styles.textMargin}>{telephone}</Text>
        </View>
      )}
      <View style={styles.row}>
        <Icon name="bullseye" size={23} color={'#2f4858'} />
        <Text style={styles.textMargin}>{hourNow}</Text>
      </View>
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
  textMargin: {
    marginLeft: 5,
  },
});

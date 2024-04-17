import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Avatar, Text, TouchableRipple, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ExploreCard() {
  const navigation = useNavigation();
  return (
    <TouchableRipple onPress={() => navigation.navigate('ViewPost')}>
      <Card style={styles.cardBackground}>
        <View>
          <Card.Title
            title={'New Tea Shop in Causeway Bay!!'}
            subtitle={
              <Text>
                <Icon name={'map-pin'} />
                TEA TEA
              </Text>
            }
            titleVariant="titleMedium"
            left={props => (
              <Avatar.Image
                {...props}
                source={require('../image/aesthetic-sailor-moon.jpg')}
              />
            )}
          />
          <Card.Content>
            <Text variant="bodyMedium">
              Introducing a new tea shop in Causeway Bay! Indulge in premium
              teas, from green to black, herbal to iced. Discover a serene
              space, expert guidance, and exquisite teaware.
            </Text>
            <View style={styles.textContainer}>
              <Text>28 Mar 2024 14:15</Text>
              <Text>@chloeeeeleung730</Text>
            </View>
            <View style={styles.spacing}></View>
          </Card.Content>
        </View>
      </Card>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  cardBackground: {
    backgroundColor: '#C9D5BD',
    width: Dimensions.get('window').width - 20,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  spacing: {
    height: 5,
  },
});

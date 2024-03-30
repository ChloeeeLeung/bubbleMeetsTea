import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
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

export default function ExploreCard() {
  const navigation = useNavigation();
  return (
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
            Introducing a new tea shop in Causeway Bay! Indulge in premium teas,
            from green to black, herbal to iced. Discover a serene space, expert
            guidance, and exquisite teaware.
          </Text>
          <View style={{height: 10}}></View>
          <Text>
            @chloeeeeleung730 28 Mar 2024 14:15{' '}
            <Icon name={'heart-o'} size={20} /> 150
          </Text>
          <View style={{height: 10}}></View>
        </Card.Content>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardBackground: {
    backgroundColor: '#C9D5BD',
    width: Dimensions.get('window').width - 20,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'serif',
    color: '#3b414c',
    marginBottom: 10,
    marginTop: 15,
    paddingLeft: 5,
  },
  row: {
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: 'center',
  },
});

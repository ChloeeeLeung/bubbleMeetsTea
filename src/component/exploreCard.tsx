import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Avatar, Text, TouchableRipple, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ExploreCard ( { title, postTime, content, like, rate, photoURL }: { title: String, postTime: String; content: String; like: number, rate: number, photoURL:String}) {
  const navigation = useNavigation();
  return (
    <TouchableRipple onPress={ () => navigation.navigate( 'ViewPost', {
      title, postTime, content, like, rate, photoURL
    })}>
      <Card style={styles.cardBackground}>
        <View>
          <Card.Title
            title={title}
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
              {content}
            </Text>
            <View style={styles.textContainer}>
              <Text>{ postTime }</Text>
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

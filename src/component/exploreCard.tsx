import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Avatar, Text, TouchableRipple, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {firebase} from '@react-native-firebase/database';

const databaseUrl =
  'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/';

export default function ExploreCard({
  title,
  postTime,
  content,
  like,
  rate,
  photoURL,
  shopID,
}: {
  title: String;
  postTime: String;
  content: String;
  like: number;
  rate: number;
  photoURL: String;
  shopID: number;
}) {
  const navigation = useNavigation();
  const [shop, setShop] = useState<{name: string}[]>([]);

  useEffect(() => {
    getShopDetail();
  }, []);

  const getShopDetail = async () => {
    try {
      const shopData = await firebase
        .app()
        .database(databaseUrl)
        .ref('shop')
        .orderByChild('id')
        .equalTo(shopID)
        .once('value');
      const List = shopData.val();
      setShop(List);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableRipple
      onPress={() =>
        navigation.navigate('ViewPost', {
          title,
          postTime,
          content,
          like,
          rate,
          photoURL,
          shopID,
        })
      }>
      <Card style={styles.cardBackground}>
        <View>
          <Card.Title
            title={title}
            subtitle={
              <Text>
                <Icon name={'map-pin'} />
                {shop[shopID]?.name}
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
            <Text variant="bodyMedium">{content}</Text>
            <View style={styles.textContainer}>
              <Text>{postTime}</Text>
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

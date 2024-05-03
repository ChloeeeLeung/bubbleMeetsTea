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
  id,
  bloggerID,
}: {
  title: String;
  postTime: String;
  content: String;
  like: number;
  rate: number;
  photoURL: String;
  id: number;
  bloggerID: string;
}) {
  const navigation = useNavigation();
  const [bloggerInfo, setBloggerInfo] = useState<any[] | []>( [] );
  const [shopName, setShopName] = useState<any[] | []>([]);

  useEffect(() => {
    getBlogger();
    getShopName();
  }, []);
  
  const getBlogger = async () =>
  {
    try
    {
      const blogger = await firebase
        .app()
        .database( databaseUrl )
        .ref( 'user' )
        .orderByChild( 'id' )
        .equalTo( bloggerID )
        .once( 'value' );
      const bloggerInfo = blogger.val();
      setBloggerInfo( bloggerInfo );
    } catch ( err )
    {
      console.log( err );
    }
  };

  const getShopName = async () => {
    try {
      const getShopID = await firebase
        .app()
        .database(databaseUrl)
        .ref('branch')
        .orderByChild('id')
        .equalTo(id)
        .once('value');
      const shopID = getShopID.val();
      const shopIDValue = shopID[id].shopID;

      const getShopName = await firebase
        .app()
        .database(databaseUrl)
        .ref('shop')
        .orderByChild('shopID')
        .equalTo(shopIDValue)
        .once('value');
      const shopNameData = getShopName.val();
      const shopNames = Object.values(shopNameData)
        .filter((item) => item !== null)
        .map((item: any) => item.shopName.toString());
      setShopName(shopNames);
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
          id,
          bloggerInfo,
        })
      }>
      <Card style={styles.cardBackground}>
        <View>
          <Card.Title
            title={title}
            subtitle={
              <Text>
                <Icon name={'map-pin'} />
                {shopName}
              </Text>
            }
            titleVariant="titleMedium"
            left={props => (
              <Avatar.Image
                {...props}
                source={{uri: bloggerInfo[1]?.iconURL == ''?'https://firebasestorage.googleapis.com/v0/b/bubble-milk-tea-de1cd.appspot.com/o/user%2FdeflaultIcon.jpg?alt=media&token=64b4ec17-103e-40a3-aebd-9067c3f030aa':bloggerInfo[1]?.iconURL}}
              />
            )}
          />
          <Card.Content>
            <Text variant="bodyMedium">{content}</Text>
            <View style={styles.textContainer}>
              <Text>{postTime}</Text>
              <Text>@{bloggerInfo[1]?.name}</Text>
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

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import {IconButton, Text, Card, Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Rating} from '@kolking/react-native-rating';
import CardUI from '../component/card';
import {firebase} from '@react-native-firebase/database';
import Auth from '@react-native-firebase/auth';

const databaseUrl =
  'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/';

export default function ViewPost({route}: {route: any}) {
  const navigation = useNavigation();

  const {title, postTime, content, like, rate, photoURL, id, bloggerInfo} = route.params;

  const [shop, setShop] = useState<any[] | []>([]);
  const [clickFav, setClickFav] = useState(false);
  const [bloggerPrefer, setBloggerPrefer] = useState('');
  
  const teaList = [
    {name: 'Bubble Tea', id: 1},
    {name: 'Fruit Tea', id: 2},
    {name: 'Herbal Tea', id: 3},
    {name: 'Milk Cap Tea', id: 4},
    {name: 'Pure Tea', id: 5},
    {name: 'Yakult', id: 6},
    {name: 'Smoothie', id: 7},
    {name: 'No Idea', id: 8},
  ];

  useEffect(() => {
    getShopDetail();
    const tea = teaList.find(item => item.id === bloggerInfo[1]?.preferType);
    setBloggerPrefer(tea ? tea.name : 'No Idea');
  }, []);

  const getShopDetail = async () => {
    try {
      const userUUID = Auth().currentUser?.uid ?? '';
      const getUserID = await firebase
        .app()
        .database(databaseUrl)
        .ref('user')
        .orderByChild('id')
        .equalTo(userUUID)
        .once('value');
      const userID = getUserID.val();

      if (userID) {
        const keys = Object.keys(userID);
        if (keys.length > 0) {
          const key = keys[1];
          const data = await firebase
            .app()
            .database(databaseUrl)
            .ref(`user/${key}/shop`)
            .once('value');
          const userShopList = data.val();

          const shopData = await firebase
            .app()
            .database(databaseUrl)
            .ref('branch')
            .orderByChild('id')
            .equalTo(id)
            .once('value');
          const List = shopData.val();
          const shopArray = Object.values(List);

          const combinedList = shopArray.map((item: any) => {
            const final = userShopList.find(
              (final: any) => final && final.id === item.id,
            );
            return {...item, ...(final || {})};
          });

          const shopPhoto = await firebase
            .app()
            .database(databaseUrl)
            .ref('shop')
            .orderByChild('shopID')
            .equalTo(combinedList[0].shopID)
            .once('value');
          const photo = shopPhoto.val();
          const photoArray = Object.values(photo);
          const filteredPhotoArray = photoArray.filter(item => item !== null);

          const finalcombinedList = combinedList.map((item: any) => {
            const final = filteredPhotoArray.find(
              (final: any) => final && final.shopID === item.shopID,
            );
            return {...item, ...(final || {})};
          });

          setShop(finalcombinedList);
          console.log(finalcombinedList);
        } else {
          console.log('No user found for the provided ID');
        }
      } else {
        console.log('Snapshot value is null or undefined');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleFavorite = async (itemId: number, itemFav: boolean) => {
    if (itemId !== undefined) {
      const id = Auth().currentUser?.uid ?? '';
      const getUserID = await firebase
        .app()
        .database(databaseUrl)
        .ref('user')
        .orderByChild('id')
        .equalTo(id)
        .once('value');
      const userID = getUserID.val();

      if (userID) {
        const keys = Object.keys(userID);
        if (keys.length > 0) {
          const key = keys[1];
          await firebase
            .app()
            .database(databaseUrl)
            .ref(`user/${key}/shop/${itemId}`)
            .update({
              fav: !itemFav,
            });
          setClickFav(!clickFav);
        } else {
          console.log('No user found for the provided ID');
        }
      } else {
        console.log('Snapshot value is null or undefined');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <IconButton
          icon="chevron-left"
          size={25}
          iconColor="#2f4858"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.pageTitle}>{title}</Text>
      </View>
      <ScrollView>
        <Card style={styles.cardBackground}>
          <Card.Title
            title={`@ ${bloggerInfo[1]?.name}`}
            subtitle={`Blogger Preference: ${bloggerPrefer}`}
            titleVariant="titleMedium"
            left={props => (
              <Avatar.Image
                {...props}
                source={{uri: bloggerInfo[1]?.iconURL == ''?'https://firebasestorage.googleapis.com/v0/b/bubble-milk-tea-de1cd.appspot.com/o/user%2FdeflaultIcon.jpg?alt=media&token=64b4ec17-103e-40a3-aebd-9067c3f030aa':bloggerInfo[1].iconURL}}
              />
            )}
          />
        </Card>
        <View style={styles.contentContainer}>
          <View style={styles.postDetail}>
            <Text>{postTime}</Text>
            <View style={styles.iconWithText}>
              <IconButton
                icon="heart"
                size={18}
                iconColor="#B22222"
                onPress={() => {}}
              />
              <Text>{like}</Text>
            </View>
          </View>
          <View style={styles.iconWithText}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>Overall:</Text>
            <Rating
              style={{marginLeft: 15}}
              rating={rate}
              size={18}
              disabled={true}
              variant={'stars-outline'}
              fillColor={'#2f4858'}
              baseColor={'#2f4858'}
            />
          </View>
          <Text style={styles.content}>{content}</Text>
          <Image
            source={{
              uri:
                photoURL ??
                'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height / 1.5,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={styles.spacing} />
        <View style={styles.cardPadding}>
          <CardUI
            logo={shop[0]?.shopLogo}
            menu={shop[0]?.shopMenu}
            name={shop[0]?.shopName}
            location={shop[0]?.addr}
            shopRating={shop[0]?.rating}
            fav={clickFav ? !shop[0]?.fav : shop[0]?.fav}
            openTime={shop[0]?.openTime}
            closeTime={shop[0]?.closeTime}
            telephone={shop[0]?.telephone}
            handleToggleFavorite={() => {
              handleToggleFavorite(
                shop[0]?.id,
                clickFav ? !shop[0]?.fav : shop[0]?.fav,
              );
            }}
            distance={shop[0]?.distance}
            shopID={shop[0]?.shopID}
            id={shop[0]?.id}
          />
        </View>
        <View style={styles.spacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardBackground: {
    backgroundColor: '#C9D5BD',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  contentContainer: {
    marginTop: 10,
  },
  contentTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  content: {
    lineHeight: 20,
    marginVertical: 15,
  },
  spacing: {
    height: 10,
  },
  postDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPadding: {
    paddingVertical: 10,
  },
});

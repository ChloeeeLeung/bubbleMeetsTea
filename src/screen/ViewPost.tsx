import React from 'react';
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

export default function ViewPost({route}: {route: any}) {
  const navigation = useNavigation();

  const {title, postTime, content, like, rate, photoURL} = route.params;

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
            title={'@chloeeeeleung730'}
            subtitle={'Blogger Preference: Bubble Tea'}
            titleVariant="titleMedium"
            left={props => (
              <Avatar.Image
                {...props}
                source={require('../image/aesthetic-sailor-moon.jpg')}
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
          {/* <View style={styles.spacing} />
          <Image
            source={require('../image/blogger/bloggerpic2.jpg')}
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height / 1.5,
              resizeMode: 'contain',
            }}
          /> */}
        </View>
        <View style={styles.spacing} />
        <View style={{paddingVertical: 10}}>
          <CardUI
            name="Tea Tea"
            location="Shop No. B240, Basement 2, Times Square, 1 Matheson Street, Causeway
            Bay, Hong Kong"
            shopRating={4.3}
            fav={false}
            openTime={'09:00'}
            closeTime={'22:00'}
            telephone={51104123}
            handleToggleFavorite={() => {}}
            distance={3.2}
            shopID={'1001'}
            id={123}
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
});

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
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ViewPost() {
  const navigation = useNavigation();

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
        <Text style={styles.pageTitle}>New Tea Shop in Causeway Bay!!</Text>
      </View>
      <ScrollView>
        <Card style={styles.cardBackground}>
          <Card.Title
            title={'@chloeeeeleung730'}
            subtitle={
              <Text>
                28 Mar 2024 14:15{'   '}
                <IconButton icon={'heart'} size={17} /> 150
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
        </Card>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>
            Introducing a new tea shop in Causeway Bay! Indulge in premium teas,
            from green to black, herbal to iced. Discover a serene space, expert
            guidance, and exquisite teaware.
          </Text>
          <Image
            source={require('../image/blogger/bloggerpic1.jpg')}
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
        <Text style={styles.shopName}>Tea Tea</Text>
        <View style={styles.shopInfoContainer}>
          <Icon name={'map-pin'} style={styles.icon} />
          <Text style={styles.shopLocation}>
            Shop No. B240, Basement 2, Times Square, 1 Matheson Street, Causeway
            Bay, Hong Kong.
          </Text>
        </View>
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
  shopInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    marginTop: 10,
  },
  icon: {
    //color: 'green',
    fontSize: 25,
    alignSelf: 'flex-start',
  },
  content: {
    lineHeight: 20,
    marginVertical: 15,
  },
  spacing: {
    height: 10,
  },
  shopName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  shopLocation: {
    paddingHorizontal: 10,
    lineHeight: 15,
    marginBottom: 10,
  },
});

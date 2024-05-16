import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, IconButton, Text, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import {firebase} from '@react-native-firebase/database';

const databaseUrl =
  'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/';

export default function PerferencePage() {
  const navigation = useNavigation();

  const [preferable, setPreferable] = useState(-1);
  const [current, setCurrent] = useState('');

  const teaList = [
    {name: 'Bubble Tea', img: require('../image/tea/bubbleTea.png'), id: 1},
    {name: 'Fruit Tea', img: require('../image/tea/fruitTea.png'), id: 2},
    {name: 'Herbal Tea', img: require('../image/tea/herbalTea.png'), id: 3},
    {name: 'Milk Cap Tea', img: require('../image/tea/milkCapTea.jpg'), id: 4},
    {name: 'Pure Tea', img: require('../image/tea/pureTea.jpg'), id: 5},
    {name: 'Yakult', img: require('../image/tea/yakult.jpg'), id: 6},
    {name: 'Smoothie', img: require('../image/tea/smoothie.png'), id: 7},
    {name: 'No Idea', img: require('../image/tea/noIdea.png'), id: 8},
  ];

  const changePerference = async () => {
    if (preferable != -1) {
      const getUserID = await firebase
        .app()
        .database(databaseUrl)
        .ref('user')
        .orderByChild('id')
        .equalTo(Auth().currentUser?.uid ?? '')
        .once('value');
      const userID = getUserID.val();
      const keys = Object.keys(userID);
      if (keys.length > 0) {
        const key = keys[1] != undefined ? keys[1] : keys[0];
        await firebase.app().database(databaseUrl).ref(`user/${key}`).update({
          preferType: preferable,
        });
      }
      navigation.goBack();
    }
  };

  const getUserPerference = async () => {
    const getUserID = await firebase
      .app()
      .database(databaseUrl)
      .ref('user')
      .orderByChild('id')
      .equalTo(Auth().currentUser?.uid ?? '')
      .once('value');
    const userID = getUserID.val();
    const keys = Object.keys(userID);
    if (keys.length > 0) {
      const key = keys[1];
      const user = await firebase
        .app()
        .database(databaseUrl)
        .ref(`user/${key}`)
        .once('value');
      const userInfo = user.val();
      const tea = teaList.find(item => item.id === userInfo.preferType);
      setCurrent(tea ? tea.name : 'No Idea');
    }
  };

  useEffect(() => {
    getUserPerference();
  }, []);

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
        <Text style={styles.pageTitle}>Preference</Text>
      </View>

      <Text style={styles.preference}>
        Your Current Drink Preference: {current}
      </Text>

      <View style={styles.imageList}>
        {teaList.map(({name, img, id}) => (
          <TouchableOpacity
            key={id}
            onPress={() => {
              setPreferable(id);
            }}
            style={styles.touchableOpacity}>
            <Image alt={name} source={img} style={styles.image} />
            <View style={styles.iconOverlay}>
              <Icon
                name={'check'}
                size={preferable == id ? 50 : 0}
                color={'#e1e9e1'}
              />
            </View>
            <Text>{name}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.padding}>
          <Button
            icon="pencil"
            mode="contained"
            onPress={() => {
              changePerference();
            }}
            buttonColor="#2f4858"
            style={styles.button}>
            Change Preference
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  imageList: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width - 50,
    margin: 5,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  touchableOpacity: {
    marginVertical: 5,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  iconOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 10,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding: {
    paddingVertical: 20,
  },
  button: {
    width: Dimensions.get('window').width - 50,
  },
  preference: {
    marginLeft: 15,
  },
});

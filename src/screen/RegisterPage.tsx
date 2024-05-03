import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import {firebase} from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';

const databaseUrl =
  'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/';

const windowWidth = Dimensions.get('window').width;

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

export default function RegisterPage() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [preferable, setPreferable] = useState(-1);

  const handleRegister = async () => {
    try {
      console.log(
        'email =>',
        email,
        ' password =>',
        password,
        ' user name =>',
        name,
      );

      if (
        email.length > 0 &&
        password.length > 0 &&
        name.length > 0 &&
        preferable != -1
      ) {
        setEmailError(false);
        setPasswordError(false);
        setNameError(false);
        setErrorMessage('');

        const response = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );

        auth().currentUser?.updateProfile({
          displayName: name,
        });

        const allUser = await firebase
          .app()
          .database(databaseUrl)
          .ref('/user')
          .once('value');
        const userNum = allUser.numChildren() ?? 0;
        const userData = {
          id: response.user.uid,
          name: name,
          email: email,
          preferType: preferable,
          blogger:false,
        };
        await firebase
          .app()
          .database(databaseUrl)
          .ref(`user/${userNum}`)
          .set(userData);

        navigation.navigate('LoginPage');

        const allShop = await firebase
          .app()
          .database(databaseUrl)
          .ref('/branch')
          .once('value');
        const shopNum = allShop.numChildren() ?? 0;
        for (let i = 0; i <= shopNum; i++) {
          const idSnapshot = await firebase
            .app()
            .database(databaseUrl)
            .ref(`branch/${i}/id`)
            .once('value');
          const shopData = {
            id: idSnapshot.val(),
            fav: false,
            distance: 0,
            recommend: 0,
          };
          await firebase
            .app()
            .database(databaseUrl)
            .ref(`user/${userNum}/shop/${i}`)
            .set(shopData);
        }
      } else if (name.length == 0) {
        setEmailError(false);
        setPasswordError(false);
        setNameError(true);
        setErrorMessage('Please fill in user name.');
      } else if (email.length == 0 && password.length != 0) {
        setEmailError(true);
        setPasswordError(false);
        setNameError(false);
        setErrorMessage('Please fill in email address.');
      } else if (email.length != 0 && password.length == 0) {
        setEmailError(false);
        setPasswordError(true);
        setNameError(false);
        setErrorMessage('Please fill in password.');
      } else if (email.length == 0 && password.length == 0) {
        setEmailError(true);
        setPasswordError(true);
        setNameError(false);
        setErrorMessage('Please fill in email address and password.');
      } else if (preferable == -1) {
        setErrorMessage('Please choose your preferred drink type.');
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('' + err);
      const errorMessage = (err as Error).message;
      const errorCode = errorMessage.match(/\[(.*?)\]/)?.[0];

      console.log(errorCode);
      if (errorCode == '[auth/invalid-email]') {
        setEmailError(true);
        setErrorMessage('The email address is badly formatted.');
      } else if (errorCode == '[auth/weak-password]') {
        setEmailError(false);
        setPasswordError(true);
        setErrorMessage('Password should be at least 6 characters.');
      } else if (errorCode == '[auth/email-already-in-use]') {
        setEmailError(true);
        setPasswordError(false);
        setErrorMessage(
          'The email address is already in use by another account.',
        );
      }
    }
  };

  return (
    <View style={styles.centered}>
      <Image
        source={require('../image/font/Welcome.png')}
        style={styles.welcome}
      />
      <View style={styles.errorBox}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
      <View style={styles.textInput}>
        <Text>User Name</Text>
        <TextInput
          placeholder="User Name"
          value={name}
          error={nameError}
          onChangeText={value => setName(value)}
          style={{
            backgroundColor: '#FFF8DE',
          }}
          left={<TextInput.Icon icon="account" />}
          activeUnderlineColor="#486B73"
        />
      </View>
      <View style={styles.textInput}>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          error={emailError}
          onChangeText={value => setEmail(value)}
          style={{
            backgroundColor: '#FFF8DE',
          }}
          left={<TextInput.Icon icon="email" />}
          activeUnderlineColor="#486B73"
        />
      </View>
      <View style={styles.textInput}>
        <Text>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          error={passwordError}
          onChangeText={value => setPassword(value)}
          secureTextEntry
          style={{
            backgroundColor: '#FFF8DE',
          }}
          left={<TextInput.Icon icon="lock" />}
          activeUnderlineColor="#486B73"
        />
      </View>
      <View style={styles.textInput}>
        <Text>What type of drink you are more preferable?</Text>
      </View>
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
      </View>
      <View style={styles.buttonBox}>
        <Button
          buttonColor="#2F4858"
          onPress={() => {
            handleRegister();
          }}>
          <Text style={styles.getStart}>Register</Text>
        </Button>
        <Button
          mode="text"
          onPress={() => {
            navigation.navigate('LoginPage');
          }}
          textColor="#2F4858">
          Have account? Sign In
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBox: {
    paddingVertical: 12,
    width: windowWidth - 50,
    height: 80,
  },
  buttonSize: {
    paddingVertical: 12,
    width: windowWidth - 50,
    height: 80,
  },
  getStart: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Caveat',
  },
  textInput: {
    width: windowWidth - 50,
    margin: 5,
  },
  textInputcolor: {
    backgroundColor: '#FFF8DE',
  },
  welcome: {
    width: 400,
    height: 70,
  },
  errorBox: {
    width: 270,
    margin: 5,
  },
  errorText: {
    color: 'red',
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
  imageList: {
    width: windowWidth - 50,
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
});

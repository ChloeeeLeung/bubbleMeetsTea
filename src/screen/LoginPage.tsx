import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {Button, TextInput} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import auth from '@react-native-firebase/auth';

const LoginPage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handlelogin = async () => {
    try {
      console.log('Username =>', username, ' password =>', password);

      // const isUserCreated = await auth().createUserWithEmailAndPassword(
      //   username,
      //   password,
      // );
      // console.log(isUserCreated);

      const isUserLogin = await auth().signInWithEmailAndPassword(
        username,
        password,
      );
      console.log(isUserLogin);

      navigation.navigate('HomePage', {
        username: isUserLogin.user.email,
        uid: isUserLogin.user.uid,
      });
    } catch (err) {
      console.log(err);
      setErrorMessage('' + err);
    }
  };

  return (
    <View style={styles.centered}>
      <Image
        source={require('../image/bubbletea.png')}
        style={{
          width: 125,
          height: 125,
          margin: 20,
        }}
      />
      <View
        style={{
          width: 300,
          height: 300,
          backgroundColor: '#C9D5BD',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 25,
        }}>
        <View
          style={{
            width: 250,
            margin: 5,
          }}>
          <Text>User Name</Text>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={value => setUsername(value)}
            style={{
              backgroundColor: '#FFF8DE',
            }}
            left={<TextInput.Icon icon="account" />}
            activeUnderlineColor="#486B73"
          />
        </View>
        <View
          style={{
            width: 250,
            margin: 5,
          }}>
          <Text>Password</Text>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={value => setPassword(value)}
            secureTextEntry
            style={{
              backgroundColor: '#FFF8DE',
            }}
            left={<TextInput.Icon icon="lock" />}
            activeUnderlineColor="#486B73"
          />
        </View>
        <View style={styles.buttonSize}>
          <Button
            buttonColor="#2F4858"
            onPress={() => {
              handlelogin();
            }}>
            <Text style={styles.getStart}>Login</Text>
          </Button>
          <Button
            mode="text"
            onPress={() => console.log('Pressed')}
            textColor="#2F4858">
            Register
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Caveat',
  },
  buttonSize: {
    paddingVertical: 12,
    width: 200,
    height: 80,
  },
  getStart: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Caveat',
  },
});

export default LoginPage;

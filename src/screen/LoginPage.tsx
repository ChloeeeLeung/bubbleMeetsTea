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

  const [usernameError, setUsernameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handlelogin = async () => {
    try {
      console.log('Username =>', username, ' password =>', password);

      if (username.length > 0 && password.length > 0) {
        setUsernameError(false);
        setPasswordError(false);
        const isUserLogin = await auth().signInWithEmailAndPassword(
          username,
          password,
        );
        console.log(isUserLogin);
        navigation.navigate('HomePage', {
          username: isUserLogin.user.email,
          uid: isUserLogin.user.uid,
        });
      } else if (username.length == 0 && password.length != 0) {
        setUsernameError(true);
        setPasswordError(false);
        setErrorMessage('Please fill in user name.');
      } else if (username.length != 0 && password.length == 0) {
        setUsernameError(false);
        setPasswordError(true);
        setErrorMessage('Please fill in password.');
      } else if (username.length == 0 && password.length == 0) {
        setUsernameError(true);
        setPasswordError(true);
        setErrorMessage('Please fill in user name and password.');
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('' + err);
      const errorMessage = (err as Error).message;
      const errorCode = errorMessage.match(/\[(.*?)\]/)?.[0];

      console.log(errorCode);
      if (errorCode == '[auth/invalid-email]') {
        setUsernameError(true);
        setErrorMessage('User Name should be an email address.');
      } else if (errorCode == '[auth/invalid-login]') {
        setUsernameError(true);
        setPasswordError(true);
        setErrorMessage(
          'Unable to Login. Please check your user name and password.',
        );
      }
    }
  };

  return (
    <View style={styles.centered}>
      <Image source={require('../image/bubbletea.png')} style={styles.image} />
      <View style={styles.errorBox}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
      <View style={styles.textInputBox}>
        <View style={styles.textInput}>
          <Text>User Name</Text>
          <TextInput
            placeholder="Username"
            error={usernameError}
            value={username}
            onChangeText={value => setUsername(value)}
            style={styles.textInputcolor}
            left={<TextInput.Icon icon="account" />}
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
            style={styles.textInputcolor}
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
            onPress={() => {
              navigation.navigate('RegisterPage');
            }}
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
  textInputBox: {
    width: 300,
    height: 300,
    backgroundColor: '#C9D5BD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  textInput: {
    width: 250,
    margin: 5,
  },
  textInputcolor: {
    backgroundColor: '#FFF8DE',
  },
  image: {
    width: 125,
    height: 125,
    margin: 10,
  },
  errorBox: {
    width: 250,
  },
  errorText: {
    color: 'red',
  },
});

export default LoginPage;

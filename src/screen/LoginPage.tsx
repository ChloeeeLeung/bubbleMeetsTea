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

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handlelogin = async () => {
    try {
      console.log('email =>', email, ' password =>', password);

      if (email.length > 0 && password.length > 0) {
        setEmailError(false);
        setPasswordError(false);
        const isUserLogin = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        console.log(isUserLogin);
        navigation.navigate('HomePage', {
          email: isUserLogin.user.email,
          uid: isUserLogin.user.uid,
        });
      } else if (email.length == 0 && password.length != 0) {
        setEmailError(true);
        setPasswordError(false);
        setErrorMessage('Please fill in email address.');
      } else if (email.length != 0 && password.length == 0) {
        setEmailError(false);
        setPasswordError(true);
        setErrorMessage('Please fill in password.');
      } else if (email.length == 0 && password.length == 0) {
        setEmailError(true);
        setPasswordError(true);
        setErrorMessage('Please fill in email address and password.');
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
      } else if (errorCode == '[auth/invalid-login]') {
        setEmailError(true);
        setPasswordError(true);
        setErrorMessage(
          'Unable to Login. Please check your email address and password.',
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
          <Text>Email</Text>
          <TextInput
            placeholder="Email"
            error={emailError}
            value={email}
            onChangeText={value => setEmail(value)}
            style={styles.textInputcolor}
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

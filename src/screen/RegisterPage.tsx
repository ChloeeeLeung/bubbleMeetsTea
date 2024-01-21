import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import {firebase} from '@react-native-firebase/database';

const databaseUrl =
  'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/';

const RegisterPage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [nameError, setNameError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

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

      if (email.length > 0 && password.length > 0 && name.length > 0) {
        setEmailError(false);
        setPasswordError(false);
        setNameError(false);

        const response = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );

        const userData = {
          id: response.user.uid,
          name: name,
          email: email,
        };
        await firebase.app().database(databaseUrl).ref('user/1').set(userData);

        navigation.navigate('LoginPage');
      } else if (name.length == 0) {
        setEmailError(false);
        setPasswordError(false);
        setNameError(true);
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
      <Image source={require('../image/bubbletea.png')} style={styles.image} />
      <View style={styles.errorBox}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
      <View style={styles.textInputBox}>
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
        <View style={styles.buttonSize}>
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
    width: 270,
  },
  errorText: {
    color: 'red',
  },
});

export default RegisterPage;

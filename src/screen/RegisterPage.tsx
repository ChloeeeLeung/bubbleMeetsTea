import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';

const RegisterPage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleRegister = async () => {
    try {
      console.log('Username =>', username, ' password =>', password);

      const isUserCreated = await auth().createUserWithEmailAndPassword(
        username,
        password,
      );
      console.log(isUserCreated);

      navigation.navigate('LoginPage');
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

export default RegisterPage;

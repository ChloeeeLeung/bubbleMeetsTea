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
import Auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {MediaType, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {firebase} from '@react-native-firebase/database';

const databaseUrl =
  'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/';

export default function ProfilePage() {
  const navigation = useNavigation();

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUser(Auth().currentUser);
  }, [user]);

  const changeIcon = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, handleResponse);
  };

  const handleResponse = (response: any) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      const storageRef = storage().ref('user');
      const newFileName = user?.email ?? '';
      const imageRef = storageRef.child(newFileName);

      const uploadTask = imageRef.putFile(imageUri);

      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {
          console.log('Error uploading image:', error);
        },
        () => {
          uploadTask.snapshot?.ref
            .getDownloadURL()
            .then(async downloadURL => {
              if (user) {
                user
                  .updateProfile({
                    photoURL: downloadURL,
                  })
                  .then(() => {
                    setUser({
                      ...user,
                      photoURL: downloadURL,
                    });
                  })
                  .catch(error => {
                    console.log('Error updating photo URL:', error);
                  });
                const getUserID = await firebase
                  .app()
                  .database(databaseUrl)
                  .ref('user')
                  .orderByChild('id')
                  .equalTo(user.uid)
                  .once('value');
                const userID = getUserID.val();
                const keys = Object.keys(userID);
                if (keys.length > 0) {
                  const key = keys[1];
                  await firebase
                    .app()
                    .database(databaseUrl)
                    .ref(`user/${key}`)
                    .update({
                      iconURL: downloadURL,
                    });
                }
              }
            })
            .catch(error => {
              console.log('Error getting download URL:', error);
            });
        },
      );
    }
  };

  const changeName = async () => {
    if (user && userName != '') {
      await user.updateProfile({
        displayName: userName,
      });
      const getUserID = await firebase
        .app()
        .database(databaseUrl)
        .ref('user')
        .orderByChild('id')
        .equalTo(user.uid)
        .once('value');
      const userID = getUserID.val();
      const keys = Object.keys(userID);
      if (keys.length > 0) {
        const key = keys[1];
        await firebase.app().database(databaseUrl).ref(`user/${key}`).update({
          name: userName,
        });
      }
      navigation.goBack();
    }
  };

  const deleteIcon = async () => {
    if (user) {
      user
        .updateProfile({
          photoURL: null,
        })
        .then(() => {
          setUser({
            ...user,
            photoURL: null,
          });
        })
        .catch(error => {
          console.log('Error updating photo URL:', error);
        });
      const getUserID = await firebase
        .app()
        .database(databaseUrl)
        .ref('user')
        .orderByChild('id')
        .equalTo(user.uid)
        .once('value');
      const userID = getUserID.val();
      const keys = Object.keys(userID);
      if (keys.length > 0) {
        const key = keys[1];
        await firebase.app().database(databaseUrl).ref(`user/${key}`).update({
          iconURL: '',
        });
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
        <Text style={styles.pageTitle}>Edit Profile</Text>
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            changeIcon();
          }}>
          <Image
            source={{
              uri:
                user?.photoURL ??
                'https://firebasestorage.googleapis.com/v0/b/bubble-milk-tea-de1cd.appspot.com/o/user%2FdeflaultIcon.jpg?alt=media&token=64b4ec17-103e-40a3-aebd-9067c3f030aa',
            }}
            style={styles.profileAvatar}
          />
          <View style={styles.iconOverlay}>
            <Icon name={'pencil'} size={80} color={'#FFFFFF'} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          icon="delete"
          mode="contained"
          buttonColor="#2f4858"
          style={styles.button}
          onPress={() => {
            deleteIcon();
          }}>
          Delete Icon
        </Button>
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{user?.displayName}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          label="New User Name"
          value={userName}
          onChangeText={userName => setUserName(userName)}
          style={styles.inputArea}
          theme={{
            colors: {
              primary: '#2f4858',
            },
          }}
        />
        <IconButton
          icon="pencil"
          iconColor="#2f4858"
          size={25}
          onPress={() => {
            changeName();
          }}
        />
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
  iconContainer: {
    alignContent: 'center',
    alignSelf: 'center',
  },
  profileAvatar: {
    width: 200,
    height: 200,
    borderRadius: 9999,
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
  nameContainer: {
    alignContent: 'center',
    alignSelf: 'center',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  inputContainer: {
    paddingVertical: 30,
    flexDirection: 'row',
  },
  inputArea: {
    borderWidth: 1,
    borderColor: '#2f4858',
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width - 80,
  },
  button: {
    width: 200,
  },
  buttonContainer: {
    alignSelf: 'center',
    padding: 15,
  },
});

import React, {SetStateAction, useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, IconButton, Text, TextInput} from 'react-native-paper';
import {
  MediaType,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/FontAwesome';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/database';
import {format} from 'date-fns';

const databaseUrl =
  'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/';

export default function PostPage() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [shopID, setShopID] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [starRating, setStarRating] = useState(5);
  const [nameList, setNameList] = useState([]);
  const [addrList, setAddrList] = useState([]);
  const [error, setError] = useState(false);
  const [postNum, setPostNum] = useState(0);

  const getShopName = async () => {
    try {
      const getShopNameList = await firebase
        .app()
        .database(databaseUrl)
        .ref('shop')
        .once('value');
      const shopNameList = getShopNameList.val();
      const uniqueNames = new Set();
      const newList = shopNameList.reduce(
        (acc: {value: any}[], item: {name: string}) => {
          if (!uniqueNames.has(item.name)) {
            uniqueNames.add(item.name);
            acc.push({value: item.name});
          }
          return acc;
        },
        [],
      );
      setNameList(newList);
    } catch (err) {
      console.log(err);
    }
  };

  const getShopAddr = async () => {
    try {
      const getShopAddrList = await firebase
        .app()
        .database(databaseUrl)
        .ref('shop')
        .once('value');
      const shopAddrList = getShopAddrList.val();
      const filteredList = shopAddrList
        .filter((item: {name: string}) => item.name === name)
        .map(({addr, id}: {addr: string; id: number}) => ({
          value: addr,
          key: id,
        }));
      setAddrList(filteredList);
    } catch (err) {
      console.log(err);
    }
  };

  const getPostNum = async () => {
    try {
      const postData = await firebase
        .app()
        .database(databaseUrl)
        .ref('explore')
        .once('value');
      const postLength = postData.numChildren() ?? 0;
      setPostNum(postLength);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getShopName();
    getPostNum();
  }, []);

  useEffect(() => {
    getShopAddr();
  }, [name]);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, handleResponse);
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, handleResponse);
  };

  const handleResponse = (response: any) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setSelectedImage(imageUri);
      console.log(selectedImage);
    }
  };

  const handleSubmit = () => {
    if (selectedImage == '' || shopID == '' || title == '' || content == '') {
      setError(true);
    } else {
      setError(false);
      const storageRef = storage().ref();
      const newFileName = 'explore' + postNum;
      const imageRef = storageRef.child(newFileName);

      const uploadTask = imageRef.putFile(selectedImage);

      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {
          console.log('Error uploading image:', error);
        },
        () => {
          uploadTask.snapshot?.ref
            .getDownloadURL()
            .then(downloadURL => {
              const postTime = format(new Date(), 'dd MMM yyyy HH:mm');
              firebase
                .app()
                .database(databaseUrl)
                .ref(`explore/${postNum}`)
                .set({
                  shopID: shopID,
                  title: title,
                  content: content,
                  rate: starRating,
                  like: 0,
                  photoURL: downloadURL,
                  postTime: postTime,
                });
              navigation.goBack();
            })
            .catch(error => {
              console.log('Error getting download URL:', error);
            });
        },
      );
    }
  };

  const handleReset = () => {
    setContent('');
    setTitle('');
    setSelectedImage('');
    setStarRating(5);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.titleContainer}>
          <IconButton
            icon="chevron-left"
            size={25}
            iconColor="#2f4858"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.pageTitle}>Share Your Exploration!</Text>
        </View>
        {error === true && (
          <Text style={styles.errorText}>
            Hey, it seems like you haven't filled in all the columns
          </Text>
        )}
        <Text style={styles.inputHint}>Name of the Tea Shop</Text>
        <SelectList
          setSelected={(val: SetStateAction<string>) => {
            setName(val);
          }}
          data={nameList}
          save="value"
          placeholder="Select Tea Shop"
        />
        <View style={styles.spacing}></View>
        <Text style={styles.inputHint}>Branch of the Tea Shop</Text>
        <SelectList
          setSelected={(val: SetStateAction<string>) => {
            setShopID(val);
          }}
          data={addrList}
          save="key"
          placeholder="Select Tea Shop Branch Address"
        />
        <View>
          {selectedImage && (
            <View style={[styles.imageContainer]}>
              <Image
                source={{uri: selectedImage}}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          )}
          {!selectedImage && (
            <View style={styles.placeholderContainer}>
              <Text style={styles.photoHint}>
                Would you like to add a photo to share with?
              </Text>
              <Text style={styles.photoHint}>Click the button below!</Text>
            </View>
          )}
        </View>
        <View style={styles.buttonRow}>
          <Button
            icon="camera"
            mode="contained"
            buttonColor="#2f4858"
            onPress={handleCameraLaunch}>
            Take Photo
          </Button>
          <Button
            icon="camera-image"
            mode="contained"
            buttonColor="#2f4858"
            onPress={openImagePicker}>
            Upload Photo
          </Button>
        </View>
        <Text style={styles.inputHint}>Give a Title to Your Exploration</Text>
        <TextInput
          value={title}
          onChangeText={title => setTitle(title)}
          style={styles.titleInputArea}
          theme={{
            colors: {
              primary: '#2f4858',
            },
          }}
        />
        <Text style={styles.inputHint}>Share Your Feelings</Text>
        <TextInput
          value={content}
          onChangeText={content => setContent(content)}
          multiline
          style={styles.inputArea}
          theme={{
            colors: {
              primary: '#2f4858',
            },
          }}
        />
        <View style={styles.spacing}></View>
        <Text style={styles.inputHint}>Overall</Text>
        <View style={styles.row}>
          {Array.from({length: 5}, (_, index) => (
            <TouchableOpacity
              key={index + 1}
              style={styles.marginRight}
              onPress={() => setStarRating(index + 1)}>
              <Icon
                name={starRating >= index + 1 ? 'star' : 'star-o'}
                size={25}
                style={styles.starColor}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.actionButtonRow}>
          <Button
            onPress={handleReset}
            style={styles.resetButton}
            icon="coffee-off"
            textColor="#2f4858">
            Reset
          </Button>
          <Button
            onPress={handleSubmit}
            style={styles.submitButton}
            icon="coffee-to-go"
            mode="contained"
            buttonColor="#2f4858">
            Submit
          </Button>
        </View>
      </ScrollView>
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    marginVertical: 10,
  },
  imageContainer: {
    marginTop: 70,
    marginBottom: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    marginVertical: 5,
  },
  image: {
    height: 200,
    width: 200,
    //flex: 1,
  },
  placeholderContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  photoHint: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  inputHint: {
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 2,
    marginLeft: 2,
  },
  titleInputArea: {
    fontWeight: 'bold',
    fontSize: 15,
    height: 40,
    borderWidth: 1,
    borderColor: '#2f4858',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  inputArea: {
    height: 120,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#2f4858',
    backgroundColor: 'transparent',
  },
  resetButton: {
    borderWidth: 2,
    borderColor: '#2f4858',
    minWidth: 180,
  },
  submitButton: {
    minWidth: 180,
  },
  actionButtonRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  spacing: {
    height: 5,
  },
  row: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    margin: 20,
  },
  starColor: {
    color: '#2f4858',
  },
  marginRight: {
    marginRight: 10,
  },
  errorText: {
    color: '#D2042D',
  },
});

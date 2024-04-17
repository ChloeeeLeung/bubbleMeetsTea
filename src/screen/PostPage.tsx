import React, {SetStateAction, useState} from 'react';
import {
  Image,
  SafeAreaView,
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

export default function PostPage() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [selected, setSelected] = useState('');
  const [starRating, setStarRating] = useState(5);

  const options = [
    {
      key: 1,
      value: 'A Nice Gift',
      address: 'Tea House, LG2, Kunkle Student Centre, Ma Liu Shui',
    },
    {
      key: 2,
      value: 'Comebuytea',
      address:
        'Shop G03, G/F, T.O.P This is Our Place, 700 Nathan Road, Mong Kok',
    },
  ];

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
    console.log('Form submitted');
  };

  const handleReset = () => {
    setName('');
    setLocation('');
    setContent('');
    setTitle('');
    setSelectedImage('');
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
        <Text style={styles.pageTitle}>Share Your Exploration!</Text>
      </View>
      <Text style={styles.inputHint}>Name of the Tea Shop</Text>
      <SelectList
        setSelected={(val: SetStateAction<string>) => {
          setSelected(val);
          console.log(val);
        }}
        data={options}
        save="key"
        placeholder="Select Tea Shop"
      />
      <View style={styles.spacing}></View>
      <Text style={styles.inputHint}>Branch of the Tea Shop</Text>
      <SelectList
        setSelected={(val: SetStateAction<string>) => {
          setSelected(val);
          console.log(val);
        }}
        data={options}
        save="key"
        placeholder="Select Tea Shop Branch Address"
      />
      <View style={styles.imageContainer}>
        {selectedImage && (
          <Image
            source={{uri: selectedImage}}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        {!selectedImage && (
          <>
            <Text style={styles.photoHint}>
              Would you like to add a photo to share with?
            </Text>
            <Text style={styles.photoHint}>Click the button below!</Text>
          </>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    marginVertical: 5,
  },
  image: {
    height: 200,
    width: 200,
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
});

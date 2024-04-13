import React, {useState} from 'react';
import {Image, SafeAreaView, StyleSheet, View, TouchableOpacity, } from 'react-native';
import {Button, IconButton, Text, TextInput} from 'react-native-paper';
import {
  MediaType,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export default function PostPage() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [reset, setReset] = useState(false);

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
    // Handle the submit logic here
    console.log('Form submitted');
  };

  const handleReset = () => {
    setName('');
    setLocation('');
    setContent('');
    setTitle('');
    setSelectedImage('');
    setReset(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <IconButton
          icon="chevron-left"
          size={25}
          style={styles.button}
          iconColor="#2f4858"
          onPress={() => {
            navigation.goBack();
          }}
        />
          <Text style={styles.pageTitle}>
            Share Your Exploration!
            </Text>
      </View>

      <View style={styles.shopInfoContainer}>
        <View style={styles.leftColumn}>
        <IconButton
            icon="coffee"
            size={40}
            iconColor="#2f4858"
            onPress={() => {
            }}
          />
        </View>
        <View style={styles.rightColumn}>
        <TextInput value={name} onChangeText={name => setName(name)} style={styles.shopName} placeholder="Shop Name"/>
        </View>
      </View>
      <TextInput value={location} onChangeText={location => setLocation(location)} style={styles.shopLocation} placeholder="Location"/>
      
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
            <Text style={styles.hint}>
              Would you like to add a photo to share with?
            </Text>
            <Text style={styles.hint}>Click the button below!</Text>
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
      <Text>Title*</Text>
      <TextInput value={title} onChangeText={title => setTitle(title)} style={styles.titleInputArea} />
      <Text>Content*</Text>
      <TextInput
        value={content}
        onChangeText={content => setContent(content)}
        multiline
        style={styles.inputArea}
      />
      <Button onPress={handleSubmit} style={styles.submitButton}>
      <Text style={styles.buttonText}>Submit</Text>
      </Button>
      <Button onPress={handleReset} style={styles.resetButton}>
        <Text style={styles.buttonText}>Reset</Text>
      </Button>
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
  shopInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftColumn: {
    flex: 1,
    paddingHorizontal: 10,
  },
  rightColumn: {
    flex: 8,
    paddingHorizontal: 10,
  },
  shopName: {
    fontSize: 20,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  shopLocation:{
    height: 25,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    marginLeft: 20,
  },
  button: {
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    marginBottom: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    //backgroundColor: '#e1e9e1',
  },
  image: {
    height: 200,
    width: 200,
  },
  hint: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  titleInputArea: {
    fontWeight: 'bold',
    fontSize: 15,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  inputArea: {
    height: 120,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'transparent',
  },
  submitButton:{
    backgroundColor: '#C9D5BD',
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
  },
  resetButton: {
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
  },
});

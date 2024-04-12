import React, {useState} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, IconButton, Text, TextInput} from 'react-native-paper';
import {
  MediaType,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

export default function PostPage() {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

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

  return (
    <SafeAreaView style={styles.container}>
      <IconButton
        icon="chevron-left"
        size={25}
        iconColor="#2f4858"
        onPress={() => {
          navigation.goBack();
        }}
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
      <TextInput value={title} onChangeText={title => setTitle(title)} />
      <Text>Content*</Text>
      <TextInput
        value={content}
        onChangeText={content => setContent(content)}
        multiline
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  image: {
    height: 200,
    width: 200,
  },
  hint: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});

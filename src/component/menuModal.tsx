import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Image, ImageSourcePropType, View} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {IconButton, Modal, Text} from 'react-native-paper';

const MenuModal = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#e1e9e1'}}>
      <View style={{flexDirection: 'row-reverse'}}>
        <IconButton
          icon="window-close"
          size={30}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ImageZoom
        cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height}
        imageWidth={Dimensions.get('window').width}
        imageHeight={Dimensions.get('window').height + 100}>
        <Image
          resizeMode={'contain'}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
          source={require('../image/menu/comebuytea.jpg')}
        />
      </ImageZoom>
    </View>
  );
};

export default MenuModal;

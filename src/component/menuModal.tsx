import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Image, ImageSourcePropType, View} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import {IconButton, Modal, Text} from 'react-native-paper';

export default function MenuModal({route}: {route: any}) {
  const navigation = useNavigation();
  const {menu} = route.params;
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
          source={{
            uri:
              menu ??
              'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          }}
        />
      </ImageZoom>
    </View>
  );
}

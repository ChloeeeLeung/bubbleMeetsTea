import React, { useEffect, useState } from 'react';
import
{
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import CardUI from '../component/card';
import { firebase } from '@react-native-firebase/database';
import { getPreciseDistance } from 'geolib';

const FavouritePage = ( {
  userLatitude,
  userLongitude,
}: {
  userLatitude: number;
  userLongitude: number;
} ) =>
{
  const [ list, setList ] = useState( null );

  useEffect( () =>
  {
    getDatabase();
  }, [] );

  const getDatabase = async () =>
  {
    try
    {
      const data = await firebase
        .app()
        .database(
          'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref( 'shop' )
        .once( 'value' );

      setList( data.val() );
    } catch ( err )
    {
      console.log( err );
    }
  };

  const handleToggleFavorite = async ( itemId: any, itemFav: any ) =>
  {
    await firebase
      .app()
      .database(
        'https://bubble-milk-tea-de1cd-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref( `shop/${ itemId }` )
      .update( {
        fav: !itemFav,
      } );

    await getDatabase();
  };

  return (
    <SafeAreaView style={ { flex: 1, padding: 10 } }>
      <View style={ styles.header }>
        <Text style={ styles.title }>My Favourite</Text>
      </View>
      <FlatList
        data={ list }
        renderItem={ item =>
        {
          let distance = null;
          if (
            item.item !== null &&
            item.item.latitude !== null &&
            item.item.longitude !== null
          )
          {
            distance =
              getPreciseDistance(
                { latitude: userLatitude, longitude: userLongitude },
                { latitude: item.item.latitude, longitude: item.item.longitude },
              ) / 1000;
          }
          if ( item.item !== null && item.item.fav == true )
          {
            return (
              <View style={ styles.row }>
                <CardUI
                  name={ item.item.name }
                  location={ item.item.addr }
                  shopRating={ item.item.rating }
                  fav={ item.item.fav }
                  openTime={ item.item.openTime }
                  closeTime={ item.item.closeTime }
                  telephone={ item.item.telephone }
                  handleToggleFavorite={ () =>
                    handleToggleFavorite( item.index, item.item.fav )
                  }
                  distance={ distance }
                />
              </View>
            );
          }
          return null;
        } }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create( {
  container: {
    paddingVertical: 15,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'serif',
    color: '#3b414c',
    marginBottom: 10,
    marginTop: 15,
    paddingLeft: 5,
  },
  row: {
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: 'center',
  },
} );

export default FavouritePage;


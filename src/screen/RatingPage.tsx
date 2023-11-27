import
{
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { Avatar, Button, Card, IconButton, Searchbar } from 'react-native-paper';
import cardList from '../component/cardList';
import CardList from '../component/cardList';

const renderScene = SceneMap( {
  first: cardList,
  second: cardList,
} );

const renderTabBar = ( props: any ) => (
  <TabBar
    { ...props }
    activeColor={ '#25171c' }
    inactiveColor={ '#c4c1c4' }
    style={ { backgroundColor: '#e1e9e1', borderRadius: 30 } }
    indicatorStyle={ { backgroundColor: 'transparent' } }
  />
);

const RatingPage = () =>
{
  const layout = useWindowDimensions();

  const [ index, setIndex ] = React.useState( 0 );
  const [ routes ] = React.useState( [
    { key: 'first', title: 'By Location' },
    { key: 'second', title: 'By Flavor' },
  ] );

  return (
    <>
      <View style={ styles.row }>
        <Image
          source={ require( '../image/bubbletea.png' ) }
          style={ { width: 60, height: 60 } }
        />
        <Text style={ styles.title }>Bubble Meets Tea</Text>

      </View>
      <CardList />
      {/* <TabView
        style={{paddingHorizontal: 10}}
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      /> */}
    </>
  );
};

const styles = StyleSheet.create( {
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'serif',
  },
  tapContainer: {
    backgroundColor: '#c4c1c4',
  },
} );

export default RatingPage;

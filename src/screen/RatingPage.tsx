import {Image, StyleSheet, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {SceneMap, TabBar} from 'react-native-tab-view';
import cardList from '../component/cardList';
import CardList from '../component/cardList';

const renderScene = SceneMap({
  first: cardList,
  second: cardList,
});

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    activeColor={'#25171c'}
    inactiveColor={'#c4c1c4'}
    style={{backgroundColor: '#e1e9e1', borderRadius: 30}}
    indicatorStyle={{backgroundColor: 'transparent'}}
  />
);

export default function RatingPage({
  userLatitude,
  userLongitude,
}: {
  userLatitude: number;
  userLongitude: number;
}) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'By Location'},
    {key: 'second', title: 'By Flavor'},
  ]);

  return (
    <>
      <View style={styles.row}>
        <Image
          source={require('../image/bubbletea.png')}
          style={{width: 65, height: 65}}
        />
        <Image
          source={require('../image/font/appNameBrown.png')}
          style={styles.appName}
        />
      </View>
      <CardList userLatitude={userLatitude} userLongitude={userLongitude} />
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
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'serif',
    marginLeft: 8,
    color: '#3D4A3D',
    letterSpacing: 1.1,
  },
  tapContainer: {
    backgroundColor: '#c4c1c4',
  },
  appName: {
    width: 260,
    height: 50,
  },
});

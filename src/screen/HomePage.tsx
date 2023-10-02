import {Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  tapContainer: {
    backgroundColor: '#c4c1c4',
  },
});

const FirstRoute = () => <View style={{flex: 1}} />;

const SecondRoute = () => <View style={{flex: 1}} />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    activeColor={'#c4c1c4'}
    inactiveColor={'#25171c'}
    style={{backgroundColor: '#e1e9e1', borderRadius: 30}}
    indicatorStyle={{backgroundColor: 'transparent'}}
  />
);

const HomePage = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'yeah'},
    {key: 'second', title: 'Second'},
  ]);

  return (
    <>
      <View style={styles.row}>
        <Image
          source={require('../image/bubbletea.png')}
          style={{width: 50, height: 50}}
        />
        <Text style={styles.title}>Bubble Meets Tea</Text>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </>
  );
};

export default HomePage;

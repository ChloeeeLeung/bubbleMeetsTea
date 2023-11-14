import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {Avatar, Button, Card, IconButton} from 'react-native-paper';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
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
});

const FirstRoute = () => (
  <View style={{marginVertical: 5}}>
    <Card
      style={{
        backgroundColor: '#FFF8DE',
        width: Dimensions.get('window').width - 20,
      }}>
      <Card.Title
        title="Comebuytea"
        subtitle="Card Subtitle"
        left={props => <Avatar.Icon {...props} icon="folder" />}
        // right={props => (
        //   <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
        // )}
      />
    </Card>
  </View>
);

const SecondRoute = () => (
  <View style={{flex: 1}}>
    <Text>2</Text>
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
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

const RatingPage = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'FUCK'},
    {key: 'second', title: 'FYP'},
  ]);

  return (
    <>
      <TabView
        style={{paddingHorizontal: 10}}
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </>
  );
};

export default RatingPage;

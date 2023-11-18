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
import {Avatar, Button, Card, IconButton, Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    <Searchbar
      style={{
        width: Dimensions.get('window').width - 20,
        marginVertical: 10,
        backgroundColor: '#F4E6DC',
      }}
      placeholder="Search"
      value={''}
    />
    <Card
      style={{
        backgroundColor: '#FFF8DE',
        width: Dimensions.get('window').width - 20,
      }}>
      <Card.Title
        title="Comebuytea"
        titleVariant="titleMedium"
        left={props => (
          <Avatar.Image
            {...props}
            source={require('../image/comebuytea.png')}
          />
        )}
        right={props => (
          <IconButton
            {...props}
            icon="heart"
            iconColor="#B22222"
            onPress={() => {}}
          />
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 15,
          marginBottom: 5,
        }}>
        <Icon name="map-marker" size={20} color={'#2f4858'} />
        <Text style={{marginLeft: 5}}>
          Shop G03, G/F, T.O.P This is Our Place, 700 Nathan Road, Mong Kok
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: 15,
          marginVertical: 5,
        }}>
        <Icon name="street-view" size={20} color={'#2f4858'} />
        <Text style={{marginLeft: 5}}>450 m</Text>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 30,
          }}>
          <Icon name="star" size={20} color={'#2f4858'} />
          <Icon name="star" size={20} color={'#2f4858'} />
          <Icon name="star" size={20} color={'#2f4858'} />
          <Icon name="star" size={20} color={'#2f4858'} />
          <Icon name="star-o" size={20} color={'#2f4858'} />
          <Text style={{marginLeft: 5}}>4.0</Text>
        </View>
      </View>
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
    {key: 'first', title: 'By Location'},
    {key: 'second', title: 'By Flavor'},
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

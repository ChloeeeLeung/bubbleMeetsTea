import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {Route, SceneMap, TabBar, TabView} from 'react-native-tab-view';
import RatingPage from './RatingPage';
import MapPage from './MapPage';
import FavouritePage from './FavouritePage';
import ProfilePage from './ProfilePage';
import {Scene} from 'react-native-tab-view/lib/typescript/src/types';
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

const renderScene = SceneMap({
  rating: RatingPage,
  map: MapPage,
  favourite: FavouritePage,
  profile: ProfilePage,
});

const getTabBarIcon = (
  props: Scene<Route> & {focused: boolean; color: string},
) => {
  const {route} = props;

  if (route.key === 'rating') {
    return <Icon name="search" size={23} color={'#2f4858'} />;
  } else if (route.key === 'map') {
    return <Icon name="map-marker" size={23} color={'#2f4858'} />;
  } else if (route.key === 'favourite') {
    return <Icon name="heart" size={23} color={'#2f4858'} />;
  } else if (route.key === 'profile') {
    return <Icon name="user" size={23} color={'#2f4858'} />;
  }
};

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    activeColor={'#25171c'}
    inactiveColor={'#c4c1c4'}
    style={{backgroundColor: '#ffffff'}}
    indicatorStyle={{backgroundColor: 'transparent'}}
    renderIcon={props => getTabBarIcon(props)}
  />
);

const HomePage = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'rating'},
    {key: 'map'},
    {key: 'favourite'},
    {key: 'profile'},
  ]);

  return (
    <>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        tabBarPosition="bottom"
      />
    </>
  );
};

export default HomePage;

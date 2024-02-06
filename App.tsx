import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import HomePage from './src/screen/HomePage';
import LoginPage from './src/screen/LoginPage';
import {PaperProvider} from 'react-native-paper';
import CardList from './src/component/cardList';
import ShopCard from './src/component/shopCard';
import MenuModal from './src/component/menuModal';
import RegisterPage from './src/screen/RegisterPage';
import SplashPage from './src/screen/SplashPage';

export type RootStackParams = {
  SplashPage: any;
  HomePage: any;
  RegisterPage: any;
  LoginPage: any;
  CardList: any;
  ShopCard: any;
  MenuModal: any;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <PaperProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="SplashPage"
            component={SplashPage}
            options={{
              headerShown: false,
              contentStyle: {
                backgroundColor: '#e1e9e1',
              },
            }}
          />
          <RootStack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{
              headerShown: false,
              contentStyle: {
                backgroundColor: '#e1e9e1',
              },
            }}
          />
          <RootStack.Screen
            name="RegisterPage"
            component={RegisterPage}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="HomePage"
            component={HomePage}
            options={{headerShown: false}}
          />
          {/* <RootStack.Screen
            name="CardList"
            component={CardList}
            options={{headerShown: false}}
          /> */}
          <RootStack.Screen
            name="ShopCard"
            component={ShopCard}
            initialParams={{name: ''}}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="MenuModal"
            component={MenuModal}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import HomePage from './src/screen/HomePage';
import LoginPage from './src/screen/LoginPage';
import {PaperProvider} from 'react-native-paper';

export type RootStackParams = {
  HomePage: any;
  LoginPage: any;
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
        <RootStack.Navigator
          initialRouteName="LoginPage"
          screenOptions={{
            contentStyle: {
              backgroundColor: '#C9D5BD',
            },
          }}>
          <RootStack.Screen
            name="HomePage"
            component={HomePage}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { NativeRouter, Route, Redirect } from 'react-router-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import LogIn from './src/screens/LogIn';
import Home from './src/screens/Home';

const AppNavigator = createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Home: Home,
  LogIn: LogIn,
}, {
  initialRouteName: 'AuthLoading',
}));

const App = () => {
  return (
    <AppNavigator />
  );
};

export default App;

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
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import LogIn from './src/screens/LogIn';
import Home from './src/screens/Home';

const App = () => {
  return (
    <NativeRouter>
      <View>
        <Route path="/" exact component={AuthLoadingScreen}/>
        <Route path="/home" exact component={Home}/>
        <Route path="/logIn" exact component={LogIn}/>
        <Redirect to="/" />
      </View>
    </NativeRouter>  
  );
};



export default App;

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import Home from './Home.js';
import Login from './Login.js';
import SignUp from './SignUp.js';

const AppNavigator = createSwitchNavigator(
    {
      Home: Home,
      Login: Login,
      SignUp: SignUp
    },
    {
      initialRouteName: "Login"
    }
  );

  const AppContainer = createAppContainer(AppNavigator);

  export default class App extends Component {
    render() {
      return <AppContainer />;
    }
  }
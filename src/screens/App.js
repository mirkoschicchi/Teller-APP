import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import Home from './Home.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Recorder from './Recorder';
import Blue from './Blue.js';
import RemoteControl from './RemoteControl';

const AppNavigator = createSwitchNavigator(
    {
      Home: Home,
      Login: Login,
      SignUp: SignUp,
      Recorder: Recorder,
      Blue: Blue,
      RemoteControl: RemoteControl
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
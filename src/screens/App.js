import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import Home from './Home.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Recorder from './Recorder';
import RemoteControl from './RemoteControl';
import AuthLoading from './AuthLoading';

const AppNavigator = createSwitchNavigator(
    {
		Login: Login,
		Home: Home,
		SignUp: SignUp,
		Recorder: Recorder,
		RemoteControl: RemoteControl,
		AuthLoading: AuthLoading
	},
	{
		initialRouteName: 'AuthLoading'
	}
  );

	const AppContainer = createAppContainer(AppNavigator);

	export default class App extends Component {

    

    render() {
      return <AppContainer/>;
    }
  }
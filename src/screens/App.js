import React, {Component} from 'react';
import {PermissionsAndroid} from 'react-native';
import {createSwitchNavigator, createAppContainer } from "react-navigation";
import Permissions from 'react-native-permissions';

import Home from './Home.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Recorder from './Recorder';
import RemoteControl from './RemoteControl';
import AuthLoading from './AuthLoading';
import Shop from './Shop';

const AppNavigator = createSwitchNavigator(
    {
		Login: Login,
		Home: Home,
		SignUp: SignUp,
		Recorder: Recorder,
		RemoteControl: RemoteControl,
		AuthLoading: AuthLoading,
		Shop: Shop
	},
	{
		initialRouteName: 'AuthLoading'
	}
  );

	const AppContainer = createAppContainer(AppNavigator);

	export default class App extends Component {

	async componentDidMount() {
		await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
			{
			  title: 'Permissions for write access',
			  message: 'Give permission to your storage to write a file',
			},
		);
	}

    render() {
      return <AppContainer/>;
    }
  }
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/screens/App';
import Login from './src/screens/Login';
import {name as appName} from './app.json';

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
    
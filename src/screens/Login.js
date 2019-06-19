import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from 'react-native-google-signin';

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';

import UserInput from '../components/UserInput.js';
import MyButton from '../components/MyButton.js';

import {
    ScrollView,
    Text,
    TextInput,
    View,
    StyleSheet,
    Image
} from 'react-native';
import { tsImportEqualsDeclaration } from '@babel/types';

export default class Login extends Component {
	static navigationOptions = {
		title: 'Login Page',
    };
    
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
    }

    componentDidMount() {
        GoogleSignin.configure({
            //It is mandatory to call this method before attempting to call signIn()
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            // Repleace with your webClientId generated from Firebase console
            webClientId:
              '36699314176-o4be1skj1rn48ve97uerbomaed1d7meo.apps.googleusercontent.com',
        });
    }

    googleSignin = async() => {
        //Prompts a modal to let the user sign in into your application.
        try {
            await GoogleSignin.hasPlayServices({
            //Check if device has Google Play Services installed.
            //Always resolves to true on iOS.
            showPlayServicesUpdateDialog: true,
             });
            const userInfo = await GoogleSignin.signIn();
            console.warn('User Info --> ', userInfo);
            this.setState({ userInfo: userInfo });
        } catch (error) {
            console.log('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play Services Not Available or Outdated');
            } else {
            console.log('Some Other Error Happened');
            }
        }
    }


    handleLogin() {
        fetch('https://teller-app-project.herokuapp.com/users/signin', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: this.state.email.trim(),
            password: this.state.password,
        }),
        })
        .then((responseStatus) => {
            if(responseStatus.status == 200) {
                this.props.navigation.navigate('Home');
            } else {
                this.props.navigation.navigate('Home');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <ScrollView style={styles.container} >
                <Image style={styles.iconStyle} source={require('../images/logo.png')}></Image>
                <Text style={styles.titleStyle}>Login</Text>
                <UserInput
                    source={usernameImg}
                    style={{margin:5}}
                    placeholder={"Email"}
                    onChangeText={(email) => this.setState({email: email})}
                    value={this.state.username}>
                </UserInput>
                <UserInput
                    source={passwordImg}
                    style={{margin:5}}
                    placeholder={"Password"}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password: password})}>
                </UserInput>
                <View style={styles.buttonStyleContainer}>
                    <MyButton
                        text={"Sign Up"}
                        onPress={() => this.props.navigation.navigate('SignUp')}
                    />
                    <MyButton
                        text={"Login"}                   
                        onPress={() => this.handleLogin()}
                    />
                </View>

                <View style={styles.container}>
                    <GoogleSigninButton
                    style={{ width: 312, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={this.googleSignin}
                    />
                </View>
            </ScrollView>
            )
    }
}

const styles = StyleSheet.create({	
	buttonStyleContainer: {
		flex: 1,
        flexDirection: 'row',
        margin: 5,
    },
    titleStyle : {
        fontSize:40, 
        fontWeight:'bold',
        textAlign:'center',
        padding:15,
        color: '#ffffff'
    },
    container: {
        backgroundColor:'#303c4a',
    },
    iconStyle: {
        position: 'absolute',
        width: 60,
        height: 60,
        top: 3,
        left: 5
    }
  });
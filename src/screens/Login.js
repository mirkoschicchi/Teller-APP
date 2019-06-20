import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

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
    Image,
    AsyncStorage
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

    handleLogin = () => {
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
        .then((res) => {
            if (res.status == 200) {
                return res.json();        
            } else {
                throw new Error(res.status)
            }            
        })
        .then(resJson => {
            AsyncStorage.setItem('JWT_TOKEN', resJson.token);
            this.props.navigation.navigate('Home');            
        })
        .catch((error) => {
            console.warn("Error: " + error);
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
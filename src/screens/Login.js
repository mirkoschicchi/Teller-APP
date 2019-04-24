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
    Image
} from 'react-native';
import { tsImportEqualsDeclaration } from '@babel/types';

export default class Login extends Component {
	static navigationOptions = {
		title: 'Login Page',
    };
    
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    }

    handleLogin() {
        fetch('http://192.168.1.126:9000/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
        }),
        })
        .then((responseStatus) => {
            console.warn(responseStatus)
            if(responseStatus.status == 200) {
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
                    placeholder={"Username"}
                    onChangeText={(username) => this.setState({username: username})}
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
            </ScrollView>
            )
    }
}

const styles = StyleSheet.create({	
	buttonStyleContainer: {
		flex: 1,
        flexDirection: 'row',
        margin: 5,
        borderWidth:3
    },
    titleStyle : {
        fontSize:40, 
        fontWeight:'bold',
        textAlign:'center',
        padding:15,
        color: '#ffffff'
    },
    container: {
        borderWidth:15,
        backgroundColor:'#724a6f',
        borderColor: '#000000',
    },
    iconStyle: {
        position: 'absolute',
        width: 80,
        height: 80,
        top: -5,
        left: -10
    }
  });
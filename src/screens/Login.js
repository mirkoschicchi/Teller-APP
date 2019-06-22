import React, {Component} from 'react';

import passwordImg from '../images/password.png';
import emailImg from '../images/email.png';

import UserInput from '../components/UserInput.js';
import MyButton from '../components/MyButton.js';

import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    Image,
    AsyncStorage,
    Switch
} from 'react-native';
import { tsImportEqualsDeclaration } from '@babel/types';

export default class Login extends Component {
	static navigationOptions = {
		title: 'Login Page',
    };
    
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', switchValue: false};
    }

    async componentDidMount() {
        var emailStored = await AsyncStorage.getItem('EMAIL');
        var passwordStored = await AsyncStorage.getItem('PASSWORD');
        if(emailStored != undefined && passwordStored != undefined) {
            this.setState({
                email: emailStored,
                password: passwordStored,
                switchValue: true,
            })
        }
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
            if(this.state.switchValue == true) {
                AsyncStorage.setItem('EMAIL', this.state.email.trim());
                AsyncStorage.setItem('PASSWORD', this.state.password);
            } else {
                AsyncStorage.removeItem('EMAIL');
                AsyncStorage.removeItem('PASSWORD');
            }
            this.props.navigation.navigate('Home');            
        })
        .catch((error) => {
            this.setState({
                error: true
            })
        });
    }

    toggleSwitch = value => {
        this.setState({ switchValue: value });
    };

    render() {
        return (
            <ScrollView style={styles.container} >
                <Image style={styles.iconStyle} source={require('../images/logo.png')}></Image>
                <Text style={styles.titleStyle}>Login</Text>
                <UserInput
                    source={emailImg}
                    style={{margin:5}}
                    placeholder={"Email"}
                    autoCapitalize={'none'}
                    onChangeText={(email) => this.setState({email: email})}
                    value={this.state.email}>
                </UserInput>
                <UserInput
                    source={passwordImg}
                    style={{margin:5}}
                    placeholder={"Password"}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password: password})}>
                </UserInput>
                <View style={styles.switchStyle}>
                    <Switch 
                        onValueChange={this.toggleSwitch}   
                        value = {this.state.switchValue}
                        style={{alignContent: 'flex-start'}}
                        thumbColor='#fff'
                        trackColor={{true: '#f2a06e', false: '#8197ab'}}
                        />
                    <Text style={{color: 'white'}}>Remember me?</Text>
                </View>
                
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

                {this.state.error?
                    <View style={{alignItems:'center'}}>
                        <Text style={{color: 'red'}}>Bad email and/or password</Text>
                    </View>:
                    null
                }
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
    },
    switchStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',       
        alignItems: 'flex-start',
    }
  });
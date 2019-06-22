import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import emailImg from '../images/email.png';
import teddyImg from '../images/teddy.png';

import UserInput from '../components/UserInput';
import MyButton from '../components/MyButton';
import MyPicker from '../components/MyPicker';
import DatePicker from '../components/datepicker';

import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StyleSheet,
    Picker,
    Image,
    AsyncStorage
} from 'react-native';

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {password: '', email: '', code: '', errorEmail: false, errorCode: false, errorCodeNotFound: false}
    }

    signUp() {
        fetch('https://teller-app-project.herokuapp.com/users/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                code: this.state.code
            }),
            })
            .then((res) => {
                if (res.status == 200) {
                    return res.json();        
                } else if (res.status == 403) {
                    this.setState({errorEmail: true, errorCode: false, errorCodeNotFound: false})
                    throw new Error(res.status)
                } else if (res.status == 404) {
                    this.setState({errorCodeNotFound: true, errorCode: false, errorEmail: false})
                    throw new Error(res.status)
                } else if (res.status == 409) {
                    this.setState({errorCode: true, errorCodeNotFound: false, errorEmail: false})
                    throw new Error(res.status)
                } 
            })
            .then(resJson => {
                AsyncStorage.setItem('JWT_TOKEN', resJson.token);
                this.props.navigation.navigate('Home');            
            })
            .catch((error) => {
                console.log("Error: " + error);
            });
    }

    render() {
        return(
            <ScrollView style={styles.container}>
                <Image style={styles.iconStyle} source={require('../images/logo.png')}></Image>
                <Text style={styles.titleStyle}>Sign-Up</Text>
                <View style={styles.inputContainer}>
                    <UserInput
                        source={usernameImg}
                        placeholder={"First Name"}>
                    </UserInput>
                    <UserInput
                        source={usernameImg}
                        placeholder={"Last Name"}>
                    </UserInput>
                </View>
                <View style={styles.inputContainer}>
                    <DatePicker
                        style={{flex: 1, backgroundColor:'#8197ab', borderWidth:3, margin: 5 }}
                        androidMode='calendar'
                        date={this.state.date}
                        mode="date"
                        placeholder="Birthday date"
                        format="DD-MM-YYYY"
                        minDate="01-01-1910"
                        maxDate="01-01-2030"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 10,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 10
                            }
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />
                    <MyPicker style={{margin:50,}}>

                    </MyPicker>
                </View>       
                <UserInput
                    source={emailImg}
                    placeholder={"Email"}
                    autoCapitalize={'none'}
                    onChangeText={(email) => this.setState({ email: email })}>
                </UserInput>
                <UserInput
                    source={usernameImg}
                    placeholder={"Username"}>
                </UserInput>
                <UserInput
                    source={passwordImg}
                    placeholder={"Password"}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password: password })}>
                </UserInput>
                <UserInput
                    source={teddyImg}
                    placeholder={"Teller code"}
                    onChangeText={(code) => this.setState({ code: code })}>
                </UserInput>
                <View style={styles.inputContainer}>
                    <MyButton
                        text={"Cancel"}
                        onPress={() => this.props.navigation.navigate('Login')}
                    />
                    <MyButton
                        text={"Sign-Up"}
                        onPress={() => this.signUp()}
                    />
                </View>  
                {this.state.errorEmail?
                    <View style={{alignItems:'center'}}>
                        <Text style={{color: 'red'}}>Email is already in use</Text>
                    </View>:
                    null
                }  
                {this.state.errorCode?
                    <View style={{alignItems:'center'}}>
                        <Text style={{color: 'red'}}>Code is already in use</Text>
                    </View>:
                    null
                } 
                {this.state.errorCodeNotFound?
                    <View style={{alignItems:'center'}}>
                        <Text style={{color: 'red'}}>Code not found</Text>
                    </View>:
                    null
                }              
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({	
	inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth:2,
        margin: 5
    },
    titleStyle : {
        fontSize:40, 
        fontWeight:'bold',
        textAlign:'center',
        paddingBottom:15,
        color: 'white'
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
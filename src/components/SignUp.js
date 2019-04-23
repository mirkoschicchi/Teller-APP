import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DatePicker from 'react-native-datepicker'
 

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import emailImg from '../images/email.png';

import UserInput from './UserInput.js';
import MyButton from './MyButton.js';
import MyPicker from './MyPicker.js';

import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StyleSheet,
    Picker
} from 'react-native';

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {username: '', password: '', email: '', phone_number: '', date:"01-01-2019"}
    }

    render() {
        return(
            <ScrollView style={styles.container}>
                <Text style={styles.titleStyle}>Sign-Up Page</Text>
                <View style={styles.inputContainer}>
                    <UserInput
                        style={{width:'70%'}}
                        source={usernameImg}
                        placeholder={"First Name"}>
                    </UserInput>
                    <UserInput
                        style={{width:'50%'}}
                        source={usernameImg}
                        placeholder={"Last Name"}>
                    </UserInput>
                </View>
                <View style={styles.inputContainer}>
                    <DatePicker
                        style={{flex: 1, backgroundColor:'#ffc90e', borderWidth:3, margin: 5}}
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
                    placeholder={"Email"}>
                </UserInput>
                <UserInput
                    source={usernameImg}
                    placeholder={"Username"}>
                </UserInput>
                <UserInput
                    source={passwordImg}
                    placeholder={"Password"}
                    secureTextEntry={true}>
                </UserInput>
                <View style={styles.inputContainer}>
                    <MyButton
                        text={"Cancel"}
                        onPress={() => this.props.navigation.navigate('Login')}
                    />
                    <MyButton
                        text={"Sign-Up"}
                        onPress={() => this.handleLogin()}
                    />
                </View>                 
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({	
	inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth:2,
        marginBottom: 5
    },
    titleStyle : {
        fontSize:40, 
        fontWeight:'bold',
        textAlign:'center',
        paddingBottom:15,
        color: 'white'
    },
    container: {
        padding: 20,
        backgroundColor:'#724a6f',
        flex:1,
    }
  });
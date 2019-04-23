import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DatePicker from 'react-native-datepicker'
 

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import emailImg from '../images/email.png';

import UserInput from './UserInput.js';
import MyButton from './MyButton.js';

import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StyleSheet
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
                        style={{flex:1}}
                        source={usernameImg}
                        placeholder={"First Name"}>
                    </UserInput>
                    <UserInput
                        style={{flex:1}}
                        source={usernameImg}
                        placeholder={"Last Name"}>
                    </UserInput>
                </View>
                <View style={styles.inputContainer}>
                    <DatePicker
                        style={{width: '50%', backgroundColor:'#ed8702', borderWidth:3}}
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
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />
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
		flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        padding: 20,
        backgroundColor:'#672def',
        flex:1,
    }
  });
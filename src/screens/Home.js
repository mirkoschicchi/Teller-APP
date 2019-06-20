import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, TextInput, Button, Image, AsyncStorage} from 'react-native';

import MyButton from '../components/MyButton';

export default class Home extends Component {
    static navigationOptions = {
        title: 'Home Page',
      };
    constructor(props) {
        super(props);
    }
    signOut = () => {
        AsyncStorage.removeItem('JWT_TOKEN');
        this.props.navigation.navigate('Login');
    }
    
    render() {
        return(
                <ScrollView style={styles.container}>
                    <Text style={styles.titleStyle}>Home</Text>
                    <Image style={styles.iconStyle} source={require('../images/logo.png')}></Image>
                    <MyButton 
                        text={'Record Page'}
                        onPress={() => this.props.navigation.navigate('Recorder')}>
                    </MyButton>
                    <MyButton 
                        text={'Remote Control'}
                        onPress={() => this.props.navigation.navigate('RemoteControl')}>
                    </MyButton>
                    <MyButton 
                        text={'Log out'}
                        onPress={() => this.signOut()}>
                    </MyButton>              
                </ScrollView>       
        );
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
        backgroundColor:'#303c4a',
    },
    iconStyle: {
        position: 'absolute',
        width: 60,
        height: 60,
        top: 3,
        left: 5
    },
    
  });
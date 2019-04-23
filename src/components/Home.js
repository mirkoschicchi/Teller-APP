import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';

export default class Home extends Component {
    static navigationOptions = {
        title: 'Home Page',
      };
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <View>
                <Text>Ciao</Text>
                <Button title={"Logout"} 
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>
        );
    }
}
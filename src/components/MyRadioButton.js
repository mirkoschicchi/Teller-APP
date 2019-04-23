import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


export default class MyRadioButton extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
        return (
            <View>
                <Text>
                    {this.state.text}
                </Text>
            </View>
        );
    }
}
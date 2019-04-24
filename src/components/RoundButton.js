import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {Image, StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class RoundButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.roundContainer}
                onPress={() => this.props.onPress()}>
                <Image
                    style={styles.image}
                    source={this.props.iconImage}>                        
                </Image>      
            </TouchableOpacity>
          
        );
    }
}

RoundButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    iconImage: PropTypes.node.isRequired
};

const styles = StyleSheet.create({
    roundContainer: {
        width: 60,
        height: 60,
        borderRadius: 60/2,
        backgroundColor: '#4f94a0',
        alignItems:'center',
        justifyContent:'center'
    },
    image: {
        width:45,
        height:45
    }
  });
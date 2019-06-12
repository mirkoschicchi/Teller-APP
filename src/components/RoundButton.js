import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {Image, StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class RoundButton extends Component {
    render() {
        return (
            <TouchableOpacity
                disabled={this.props.isDisabled}
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
        backgroundColor: '#8197ab',
        alignItems:'center',
        justifyContent:'center',
        margin:10
    },
    image: {
        width:45,
        height:45,
    }
  });
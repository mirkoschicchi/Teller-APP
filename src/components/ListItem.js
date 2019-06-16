import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ListItem extends Component {

    constructor(props) {
		super(props);
    }

	render() {
		return (
            <TouchableOpacity 
                style={this.props.option ? styles.containerPressed : styles.container}   
				onPress={() => this.props.onPress()}
			>
                <Text style={styles.audioTrack}>{this.props.item.name}</Text>
                <Icon style={{flex:1}} name="delete" size={40} color="#f2a06e" onPress={() => this.props.deleteMedia(this.props.item.id)}/>
            </TouchableOpacity>	
		);
	}
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        borderWidth: 2,
        padding:5,
        flexDirection: 'row',
        width: '95%',
        alignItems: 'center',
        backgroundColor: '#8197ab' 
      },
      containerPressed: {
        justifyContent: 'space-around',
        borderWidth: 2,
        padding:5,
        flexDirection: 'row',
        width: '95%',
        alignItems: 'center',
        backgroundColor: '#fde789' 
      },
      audioTrack: {
        fontSize: 20,
        color: 'white',
        flex:2
      },
})
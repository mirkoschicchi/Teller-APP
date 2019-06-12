import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class MyButton extends Component {
	render() {
		const { text, onPress} = this.props;
		return (
			<TouchableOpacity 
				style={styles.buttonStyle}
				onPress={() => onPress()}
			>
				<Text style={styles.textStyle}>{text}</Text>
			</TouchableOpacity>
		);
	}
}
MyButton.propTypes = {
	text: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
};
  
  const styles = StyleSheet.create({
	textStyle: {
		fontSize:20,
		color: '#ffffff',
		textAlign: 'center'
	},
	
	buttonStyle: {
		flex: 1,
		width: "50%",
		padding:5,
		margin: 5,
		backgroundColor: '#f2a06e',
		borderRadius:20,
		borderWidth: 3
	}
  });
import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ScrollView, Image } from 'react-native';

import MyButton from '../components/MyButton';

import DateTimePicker from "react-native-modal-datetime-picker";

export default class ParentalControl extends Component {

    constructor(props) {
		super(props);
		this.state = {
		  isDateTimePickerVisibleFrom: false,
		  isDateTimePickerVisibleTo: false,
		  from: '00:00',
		  to: '23:59'
		};
	  }

	showDateTimePickerFrom = () => {
		this.setState({ isDateTimePickerVisibleFrom: true });
	};

	showDateTimePickerTo = () => {
		this.setState({ isDateTimePickerVisibleTo: true });
	};

	hideDateTimePickerFrom = () => {
		this.setState({ isDateTimePickerVisibleFrom: false });
	};

	hideDateTimePickerTo = () => {
		this.setState({ isDateTimePickerVisibleTo: false });
	};

	handleDatePickedFrom = date => {
		console.warn("A date has been picked: ", date);
		this.setState({
			from: (date.getHours()<10?'0':'') + date.getHours() + ':' +  (date.getMinutes()<10?'0':'') + date.getMinutes()
		})
		this.hideDateTimePickerFrom();
	};

	handleDatePickedTo = date => {
		this.setState({
			to: (date.getHours()<10?'0':'') + date.getHours() + ':' +  (date.getMinutes()<10?'0':'') + date.getMinutes()
		})
		console.warn("A date has been picked: ", date);
		this.hideDateTimePickerTo();
	};

	render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
                <Image style={styles.iconStyle} source={require('../images/logo.png')}></Image>
                <Text style={styles.titleStyle}>Parental control</Text>

				<Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>Time range of allowed device use</Text>

				<DateTimePicker
					mode={'time'}
					isVisible={this.state.isDateTimePickerVisibleFrom}
					onConfirm={this.handleDatePickedFrom}
					onCancel={this.hideDateTimePickerFrom}
        		/>

				<DateTimePicker
					mode={'time'}
					isVisible={this.state.isDateTimePickerVisibleTo}
					onConfirm={this.handleDatePickedTo}
					onCancel={this.hideDateTimePickerTo}
				/>
				<View style={styles.buttonStyleContainer}>
					<MyButton
						text={"From"}                   
						onPress={this.showDateTimePickerFrom}
					/>
					<Text style={styles.text}>{this.state.from}</Text>
				</View>
				
				<View style={styles.buttonStyleContainer}>
					<MyButton
						text={"To"}                   
						onPress={this.showDateTimePickerTo}
					/>
					<Text style={styles.text}>{this.state.to}</Text>
				</View>
				
				<MyButton
					text={"Confirm"}                   
					onPress={() => this.props.navigation.navigate('Home')}
				/>
            </ScrollView>
            )
    }
}

const styles = StyleSheet.create({	
	buttonStyleContainer: {
        flexDirection: 'row',
		margin: 5,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
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
		alignContent:'center'
    },
    iconStyle: {
        position: 'absolute',
        width: 60,
        height: 60,
        top: 3,
        left: 5
    },
    text: {
		fontSize: 25,
		flex: 2,
		fontWeight: 'bold',
		color: '#fff'
	}
  });
import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, TextInput, Button, Image, AsyncStorage, FlatList, Alert} from 'react-native';

import OptionsMenu from "react-native-options-menu";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MyButton from '../components/MyButton';

export default class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {audioList: ['123123123_Cappuccetto Rosso', '234234234_Biancaneve', '123123123_Pinocchio']}
    }

    componentDidMount() {
        // fetch('https://teller-app-project.herokuapp.com/users/signin', {

        // })
        // .then()
        // .catch((error) => {
        //     console.warn('Error: ' + error);
        // })
    }

    buy = () => {
        console.warn("Bought")
    }

    showDetails = () => {
        Alert.alert("Outline","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
    }

    cancel = () => {

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.titleStyle}>Shop</Text>
                <Image style={styles.iconStyle} source={require('../images/logo.png')}></Image>    
                <FlatList 
                    ItemSeparatorComponent={ () => <View style={ { width: '100%', height: 2, backgroundColor: '#303c4a' } } /> }  
					data={this.state.audioList}
					renderItem={({item}) =>
						<View style={styles.flatview}>
							<Text style={styles.audioTrack}>{item.split('_')[1]}</Text>
                            <Text style={styles.detail}>{"10 min"}</Text>
                            <Text style={styles.detail}>{"1€"}</Text>
                            <OptionsMenu
                                customButton={<Icon name="dots-vertical" size={30} color="#f2a06e" />}
                                destructiveIndex={1}
                                options={["Buy and download", "Outline", "Cancel"]}
                                actions={[this.buy, this.showDetails, this.cancel]}/>
						</View>
					}
					keyExtractor={(item, index) => index.toString()}
				></FlatList>

                <MyButton
                    text={'Home'}
                    onPress={() => {this.props.navigation.navigate('Home')}}j
                />
                             
            </ScrollView> 
        )
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
    flatview: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#8197ab',
    },
    audioTrack: {
        fontSize: 18,
        color: 'white',
        flex:3,
        paddingLeft: 5
    },
    detail: {
        fontSize: 18,
        color: 'white',
        flex:1,
        paddingLeft: 5,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: 'red'
    }

});
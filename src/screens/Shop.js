import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, Button, Image, AsyncStorage, FlatList, Alert, PermissionsAndroid, ToastAndroid, Platform} from 'react-native';

import OptionsMenu from "react-native-options-menu";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MyButton from '../components/MyButton';

import RNFetchBlob from 'rn-fetch-blob';

import {uuidv4} from '../utilities/Uuid';

export default class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {audioList: [], userToken:''}
    }

    componentDidMount() {
        this.getMedia();   
    }

    getMedia = async () => {
        const userToken = await AsyncStorage.getItem('JWT_TOKEN');
        fetch('https://teller-app-project.herokuapp.com/users/dashboard/media/', {
            method: 'GET',
            headers: {
                'Authorization': userToken,
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data',
			},
        })
        .then((response) => {
			return response.json(); 
		})	
		.then((responseJson) => {
            this.setState({
                audioList: responseJson.media,
                userToken: userToken
            })
		})
		.catch((error) => {
			console.warn("Error: " + error)
		})
    }   

    buy = async (item) => {
        id = uuidv4();
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: "Storage Permission",
                message: "App needs access to memory to download the file "
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.warn("Bought")
                RNFetchBlob.config({
                    // response data will be saved to this path if it has access right.
                    fileCache: true,
                    path: '/storage/emulated/0/Teller/' + id + '_' + item.name, // this is the path where your download file will be in
                    description : 'Downloading file.'                      
                })
                .fetch('GET', 'https://teller-app-project.herokuapp.com/users/dashboard/media/download?name=' + item.name + '&length=' + item.length + '&price='+item.price, {
                    'Authorization': this.state.userToken,    
                })
                .then((res) => {
                    ToastAndroid.showWithGravity(
                        "Media downloaded successfully!",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                    console.warn(res.path())                 
                })
                .catch((error) => {
                    console.warn("Error: " + error)
                })
            } else {
              Alert.alert(
                "Permission Denied!",
                "You need to give storage permission to download the file"
              );
            }
          } catch (err) {
            console.warn(err);
          }



        
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
							<Text style={styles.audioTrack}>{item.name}</Text>
                            <Text style={styles.detail}>{item.length}m</Text>
                            <Text style={styles.detail}>{item.price}€</Text>
                            <OptionsMenu
                                customButton={<Icon name="dots-vertical" size={30} color="#f2a06e" />}
                                destructiveIndex={1}
                                options={["Buy and download", "Outline", "Cancel"]}
                                actions={[() => this.buy(item), this.showDetails, this.cancel]}/>
						</View>
					}
					keyExtractor={(item, index) => index.toString()}
				></FlatList>

                <View style={{alignItems: 'center'}}>
                    <MyButton
                        text={'Home'}
                        onPress={() => {this.props.navigation.navigate('Home')}}j
                    />
                </View> 
                             
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
import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, TextInput, Button, Image} from 'react-native';
import Slider from '@react-native-community/slider';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButton from '../components/MyButton';

export default class RemoteControl extends Component {
    static navigationOptions = {
        title: 'Remote Control',
      };
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
        };

    }
    
    playMedia(media) {
        fetch('url:5000/controls/play/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                media: media
            }),
        });
    }

    playRandom() {
        fetch('url:5000/controls/play', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }

    stop() {
        fetch('url:5000/controls/stop', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }

    changeVolume(val) {
        fetch('url:5000/controls/stop/' + val, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }

    render() {
        return(
            <ScrollView style={styles.container}>
                <Image style={styles.iconStyle} source={require('../images/logo.png')}></Image>
                <Text style={styles.titleStyle}>Remote Control</Text>
                
				<View style={{flexDirection: 'row', alignItems:"center"}}>
                    <Icon style={{flex:1}} name="play-circle" size={40} color="#f2a06e" onPress={this.playRandom}/>
                    <Icon style={{flex:1}} name="stop-circle" size={40} color="#f2a06e" onPress={this.stop}/>
                </View>
                <View style={{flexDirection: 'row', alignItems:"center"}}>
                    <Icon style={{flex:1}} name="volume-high" size={40} color="#f2a06e"/>
                    <Slider
                        style={{width: 200, height: 40}}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        onValueChange={(val) => this.changeVolume(val)}
                        thumbTintColor="#f2a06e"
                    />
                </View>
                
                
                
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
    }
  });
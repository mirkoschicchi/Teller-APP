import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {ScrollView, StyleSheet, Text, View, TextInput, Button, Image} from 'react-native';


import RoundButton from '../components/RoundButton.js';

export default class RecordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRecording: false,
            isFinishRecorded: false,
            isPlaying: false,
            isPaused: false,
            currentTime: 0,
            audioLength: 0
        }
        this.timer = null
    }

    record = () => {
        const { isPlaying } = this.state
        if (isPlaying) {
          this.stopPlaying()
        }
    
        this.prepareRecordingPath()
        AudioRecorder.startRecording()
        this.setState({
          isPlaying: false,
          isRecording: true,
          isFinishRecorded: false,
          audioLength: 0,
          currentTime: 0
        })
    
        this.timer = setInterval(() => {
          const time = this.state.currentTime + 1
          this.setState({currentTime: time})
          if (time === Constants.MAX_AUDIO_LENGTH) {
            this.stopRecording()
          }
        }, 1000)
    }

    stopRecording = () => {
        const { isRecording } = this.state
        if (!isRecording) return
    
        AudioRecorder.stopRecording()
        this.setState({audioLength: this.state.currentTime + 1})
        clearInterval(this.timer)
        this.setState({ isRecording: false, isFinishRecorded: true, currentTime: 0})
    }

    render() {
        return(
            <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
                <Image style={styles.iconStyle} source={require('../images/logo.png')}></Image>
                <Text style={styles.titleStyle}>Record</Text>
                
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
        flex: 1,
        fontSize:40, 
        fontWeight:'bold',
        textAlign:'center',
        padding:15,
        color: '#ffffff'
    },
    container: {
        borderWidth:15,
        backgroundColor:'#724a6f',
        borderColor: '#000000',
    },
    iconStyle: {
        flex:1,
        position: 'absolute',
        width: 80,
        height: 80,
        top: -5,
        left: -10
    }
  });
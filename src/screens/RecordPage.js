import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {ScrollView, StyleSheet, Text, View, TextInput, Button, Image} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';


import RoundButton from '../components/RoundButton.js';

export default class RecordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioFile: '',
            recording: false,
            loaded: false,
            paused: true
        }
    }

    async componentDidMount() {
        await this.checkPermission();
    
        const options = {
          sampleRate: 16000,
          channels: 1,
          bitsPerSample: 16,
          wavFile: 'test.wav'
        };
    
        AudioRecord.init(options);
    
        // AudioRecord.on('data', data => {
        //   const chunk = Buffer.from(data, 'base64');
        //   console.log('chunk size', chunk.byteLength);
        //   // do something with audio chunk
        // });
    }

    checkPermission = async () => {
        const p = await Permissions.check('microphone');
        console.log('permission check', p);
        if (p === 'authorized') return;
        return this.requestPermission();
    };

    requestPermission = async () => {
        const p = await Permissions.request('microphone');
        console.log('permission request', p);
    };

    start = () => {
        console.log('start record');
        this.setState({ audioFile: '', recording: true, loaded: false });
        AudioRecord.start();
    };

    stop = async () => {
        if (!this.state.recording) return;
        console.log('stop record');
        let audioFile = await AudioRecord.stop();
        console.log('audioFile', audioFile);
        this.setState({ audioFile, recording: false });   
    };

    load = () => {
        return new Promise((resolve, reject) => {
          if (!this.state.audioFile) {
            return reject('file path is empty');
          }
    
          this.sound = new Sound(this.state.audioFile, '', error => {
            if (error) {
              console.log('failed to load the file', error);
              return reject(error);
            }
            this.setState({ loaded: true });
            return resolve();
          });
        });
      };
    
      play = async () => {
        if (!this.state.loaded) {
          try {
            await this.load();
          } catch (error) {
            console.log(error);
          }
        }
    
        this.setState({ paused: false });
        Sound.setCategory('Playback');
    
        this.sound.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
          this.setState({ paused: true });
          // this.sound.release();
        });
    };

    render() {
        return(
            <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
                <Image style={styles.iconStyle} source={require('../images/logo.png')}></Image>
                <Text style={styles.titleStyle}>Record</Text>
                <RoundButton
                    iconImage={require('../images/microphone.png')}
                    onPress={() => {this.start()}}
                    disabled={this.state.recording}>
                </RoundButton>
                <RoundButton
                    iconImage={require('../images/stop.png')}
                    onPress={() => {this.stop()}}
                    disabled={!this.state.recording}>
                </RoundButton>
                <Button title={'Play'} onPress={this.play}></Button>
                
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
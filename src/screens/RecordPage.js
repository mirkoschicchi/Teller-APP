import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {ScrollView, StyleSheet, Text, View, TextInput, Button, Image, Platform} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';

import {AudioRecorder, AudioUtils} from 'react-native-audio';


import RoundButton from '../components/RoundButton.js';

export default class RecordPage extends Component {
    state = {
        currentTime: 0.0,
        recording: false,
        paused: false,
        stoppedRecording: false,
        finished: false,
        audioPath: 'sdcard/sound.mp4',
        hasPermission: undefined,
      };
  
    prepareRecordingPath(audioPath){
        AudioRecorder.prepareRecordingAtPath(audioPath, {
          SampleRate: 22050,
          Channels: 1,
          AudioQuality: "Low",
          AudioEncoding: "aac",
          AudioEncodingBitRate: 32000
        });
    }

    componentDidMount() {
        AudioRecorder.requestAuthorization().then((isAuthorised) => {
          this.setState({ hasPermission: isAuthorised });
          if (!isAuthorised) return;
  
          this.prepareRecordingPath(this.state.audioPath);
  
          AudioRecorder.onProgress = (data) => {
            this.setState({currentTime: Math.floor(data.currentTime)});
          };
  
          AudioRecorder.onFinished = (data) => {
            // Android callback comes in the form of a promise instead.
            if (Platform.OS === 'ios') {
              this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
            }
          };
        });
  }


  async _pause() {
    if (!this.state.recording) {
      console.warn('Can\'t pause, not recording!');
      return;
    }

    try {
      const filePath = await AudioRecorder.pauseRecording();
      this.setState({paused: true});
    } catch (error) {
      console.error(error);
    }
  }

  async _resume() {
    if (!this.state.paused) {
      console.warn('Can\'t resume, not paused!');
      return;
    }

    try {
      await AudioRecorder.resumeRecording();
      this.setState({paused: false});
    } catch (error) {
      console.error(error);
    }
  }

  async _stop() {
    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!');
      return;
    }

    this.setState({stoppedRecording: true, recording: false, paused: false});

    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  async _play() {
    if (this.state.recording) {
      await this._stop();
    }

    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, '', (error) => {
        if (error) {
          console.warn('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  }

  async _record() {
    if (this.state.recording) {
      console.warn('Already recording!');
      return;
    }

    if (!this.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!');
      return;
    }

    if(this.state.stoppedRecording){
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.setState({recording: true, paused: false});
    try {
      const filePath = await AudioRecorder.startRecording();
      console.warn(filePath)
    } catch (error) {
      console.error(error);
    }
  }

  _finishRecording(didSucceed, filePath, fileSize) {
    this.setState({ finished: didSucceed });
    console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
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
                    onPress={() => {this._record()}}
                    disabled={this.state.recording}>
                </RoundButton>
                <RoundButton
                    iconImage={require('../images/stop.png')}
                    onPress={() => {this._stop()}}
                    disabled={!this.state.recording}>
                </RoundButton>
                <Button title={'Play'} onPress={() => this._play()}></Button>
                
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
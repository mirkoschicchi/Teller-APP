import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {ScrollView, StyleSheet, Text, View, TextInput, Button, Image, Platform, PermissionsAndroid, FlatList} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';

import RNFetchBlob from 'rn-fetch-blob';

import {AudioRecorder, AudioUtils} from 'react-native-audio';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import RoundButton from '../components/RoundButton.js';

import DialogInput from 'react-native-dialog-input';

//import AudioList from '../components/AudioList.js';

const audioRecorderPlayer = new AudioRecorderPlayer();

onStartRecord = async () => {
  const result = await this.audioRecorderPlayer.startRecorder();
  this.audioRecorderPlayer.addRecordBackListener((e) => {
    this.setState({
      recordSecs: e.current_position,
      recordTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
    });
    return;
  });
  console.log(result);
}

onStopRecord = async () => {
  const result = await this.audioRecorderPlayer.stopRecorder();
  this.audioRecorderPlayer.removeRecordBackListener();
  this.setState({
    recordSecs: 0,
  });
  console.log(result);
}

export default class Recorder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggingIn: false,
            recordSecs: 0,
            recordTime: '00:00:00',
            currentPositionSec: 0,
            currentDurationSec: 0,
            playTime: '00:00:00',
			duration: '00:00:00',
			audioList: [],
			newAudioName: 'unknown.mp3',
			isAlertShown: false
        };

        this.audioRecorderPlayer = new AudioRecorderPlayer();
        this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
    }

    componentDidMount() {
		RNFetchBlob.fs.ls('/storage/emulated/0/Teller/')
        .then((files) => {
			console.warn(files)
			this.setState({audioList: files});
        })
        .catch(error => {
          console.warn(error)
        })
    }

    onStartRecord = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Permissions for write access',
                message: 'Give permission to your storage to write a file',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.warn('Permission already granted');
            } else {
              console.warn('permission denied');
              return;
            }
          } catch (err) {
            console.warn(err);
            return;
          }
        }
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
              {
                title: 'Permissions for write access',
                message: 'Give permission to your storage to write a file',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.warn('Permission to record audio already granted');
            } else {
              console.warn('permission denied');
              return;
            }
          } catch (err) {
            console.warn(err);
            return;
          }
        }
        const path = Platform.select({
          ios: 'hello.m4a',
          android: '/storage/emulated/0/Teller/' + this.state.newAudioName,
        });
        const uri = await this.audioRecorderPlayer.startRecorder(path);
        this.audioRecorderPlayer.addRecordBackListener((e) => {
          this.setState({
            recordSecs: e.current_position,
            recordTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
          });
          return;
        });
        console.warn(`uri: ${uri}`);
      }
    
    onStopRecord = async () => {
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        this.setState({
		  recordSecs: 0,
		  
        });
		console.warn(result);
		RNFetchBlob.fs.ls('/storage/emulated/0/Teller/')
		.then((files) => {
			console.warn(files)
			this.setState({audioList: files});
		})
		.catch(error => {
		console.warn(error)
		})
    }

    onStartPlay = async () => {
        console.log('onStartPlay');
        const path = Platform.select({
          ios: 'hello.m4a',
          android: '/storage/emulated/0/Teller/' + this.state.newAudioNames,
        });
        const msg = await this.audioRecorderPlayer.startPlayer(path);
        this.audioRecorderPlayer.setVolume(1.0);
        console.log(msg);
        this.audioRecorderPlayer.addPlayBackListener((e) => {
          if (e.current_position === e.duration) {
            console.log('finished');
            this.audioRecorderPlayer.stopPlayer();
          }
          this.setState({
            currentPositionSec: e.current_position,
            currentDurationSec: e.duration,
            playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
            duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
          });
          return;
        });
    }

    playSpecificAudio = async (audio) => {
		const path = Platform.select({
			ios: 'hello.m4a',
			android: '/storage/emulated/0/Teller/' + audio,
		  });
		  const msg = await this.audioRecorderPlayer.startPlayer(path);
		  this.audioRecorderPlayer.setVolume(1.0);
		  console.log(msg);
		  this.audioRecorderPlayer.addPlayBackListener((e) => {
			if (e.current_position === e.duration) {
			  console.log('finished');
			  this.audioRecorderPlayer.stopPlayer();
			}
			this.setState({
			  currentPositionSec: e.current_position,
			  currentDurationSec: e.duration,
			  playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
			  duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
			});
			return;
		  });
	}

	deleteAudio = (audio) => {
		path = '/storage/emulated/0/Teller/' + audio;
		RNFetchBlob.fs.unlink(path)
		.then(() => {
			RNFetchBlob.fs.ls('/storage/emulated/0/Teller/')
			.then((files) => {
				console.warn(files)
				this.setState({audioList: files});
			})
			.catch(error => {
			console.warn(error)
			})
		})
		.catch(error => {
			alert(error)
		})
	}

    render() {
        return(
            <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
                <Image style={styles.iconStyle} source={require('../images/logo.png')}></Image>
                <Text style={styles.titleStyle}>Record</Text>
                <RoundButton
                    iconImage={require('../images/microphone.png')}
                    onPress={() => this.setState({'isAlertShown': true})}
                    disabled={this.state.recording}>
                </RoundButton>
                <RoundButton
                    iconImage={require('../images/stop.png')}
                    onPress={this.onStopRecord}
                    disabled={!this.state.recording}>
                </RoundButton>
				{this.state.isAlertShown?<DialogInput 
					isDialogVisible={this.state.isDialogVisible}
					title={"New audio name"}
					message={"Insert the name of the new audio"}
					hintInput ={"audio.mp3"}
					submitInput={ (inputText) => {
						this.setState({'newAudioName': inputText});
						this.setState({'isAlertShown': false})
						this.onStartRecord();
					} }
					closeDialog={ () => this.setState({'isAlertShown': false})}>
				</DialogInput>:null}
                <Button title={'Play'} onPress={this.onStartPlay}></Button>
				<FlatList
					data={this.state.audioList}
					renderItem={({item}) =>
						<View style={styles.flatview}>
							<Text>{item}</Text>
							<Button title={'Play'} onPress={() => this.playSpecificAudio(item)}></Button>
							<Button title={'Delete'} onPress={() => this.deleteAudio(item)}></Button>
						</View>
					}
				></FlatList>
            	
                
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
	},
	itemStyle: {
		borderWidth: 3,
		backgroundColor: 'red',
		margin: 30
	},
	itemContainer: {
		width: '100%',
		backgroundColor: 'yellow'
	},
	flatview: {
		justifyContent: 'center',
		padding: 10,
		borderRadius: 2,
		borderWidth: 2,
		flexDirection: 'row'
	},
  });
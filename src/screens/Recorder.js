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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const audioRecorderPlayer = new AudioRecorderPlayer();

import MyButton from '../components/MyButton';

import {uuidv4} from '../utilities/Uuid';


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
			recording: false,
			audioList: [],
			newAudioName: 'unknown.mp3',
            isAlertShown: false,
			playing: false,
			host: 'http://192.168.1.90:5000/'
        };

        //this.onPress = this.onPress.bind(this)

        this.audioRecorderPlayer = new AudioRecorderPlayer();
        this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
    }

    async componentDidMount() {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
			{
			  title: 'Permissions for write access',
			  message: 'Give permission to your storage to write a file',
			},
		);
		if(granted) {
			RNFetchBlob.fs.ls('/storage/emulated/0/Teller/')
       		.then((files) => {
				this.setState({audioList: files});
			})
			.catch(error => {
			console.warn(error)
			})
		}
	}
		

	componentWillUnmount() {
		this.stopCurrentPlay();
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
		
		// Generate uuid
		id = uuidv4();

        const path = Platform.select({
          android: '/storage/emulated/0/Teller/' + id + '_' + this.state.newAudioName + '.mp3',
        });
        const uri = await this.audioRecorderPlayer.startRecorder(path);
        this.audioRecorderPlayer.addRecordBackListener((e) => {
          this.setState({
            recordSecs: e.current_position,
			recordTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
			recording: true
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
		  recording: false
        });
		RNFetchBlob.fs.ls('/storage/emulated/0/Teller/')
		.then((files) => {
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
			android: '/storage/emulated/0/Teller/' + audio,
		  });
		  const msg = await this.audioRecorderPlayer.startPlayer(path);
		  this.audioRecorderPlayer.setVolume(1.0);
		  console.log(msg);
		  this.audioRecorderPlayer.addPlayBackListener((e) => {
			if (e.current_position === e.duration) {
				this.setState({
					playing: false
				  })
			  	this.audioRecorderPlayer.stopPlayer();
			  
			} else {
				this.setState({
					currentPositionSec: e.current_position,
					currentDurationSec: e.duration,
					playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
					duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
					playing: true,
				  });
			}
			
			return;
		  });
	}

	stopCurrentPlay() {
		this.setState({
			playing: false
		});
		this.audioRecorderPlayer.stopPlayer();
	}

	deleteAudio = (audio) => {
		path = '/storage/emulated/0/Teller/' + audio;
		RNFetchBlob.fs.unlink(path)
		.then(() => {
			RNFetchBlob.fs.ls('/storage/emulated/0/Teller/')
			.then((files) => {
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

	sendToDevice = async (item) => {
		let id = item.split('_')[0].trim();
		let name = item.split('_')[1].trim();
		let path_to_a_file = 'file://' + '/storage/emulated/0/Teller/' + item;

		let formData = new FormData();
		formData.append('media', {
			uri: path_to_a_file,
			name:  item,
			type: 'audio/mp3',
		});
		
		formData.append('name', name);  
		fetch(this.state.host+'media/' + id, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data',
			},
			body: formData
		})
		.then((response) => {
			if(response.status == 200) {
				return response.json(); 
			} else if (res.status == 500) {
				throw new Error(res.status)
			}		
		})	
		.then((responseJson) => {
			alert('Media sent to Teller')
			console.warn(responseJson)
		})
		.catch((error) => {
			alert('Error! The media is already available on Teller')
			console.warn("Error: " + error)
		})
		 
	}

    render() {
        return(
        <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
            <Image style={styles.iconStyle} source={require('../images/logo.png')}></Image>
            <Text style={styles.titleStyle}>Record</Text>
				{!this.state.recording?
					<RoundButton
						iconImage={require('../images/microphone.png')}
						onPress={() => this.setState({'isAlertShown': true})}
						isDisabled={this.state.recording}>
                	</RoundButton>:
					<RoundButton
						iconImage={require('../images/stop.png')}
						onPress={this.onStopRecord}
						isDisabled={!this.state.recording}>
                    </RoundButton>
				}
                
                
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
					closeDialog={() => this.setState({'isAlertShown': false})}>
				</DialogInput>:null}
      
				<FlatList
					ListHeaderComponent={
						() =>{
						return (
							<View style={{flexDirection: 'row', justifyContent:'center',alignContent:'center'}}>
							<Text style={styles.headerList}>{"Audio List"}</Text>
							</View>
						)
						}
					}
					data={this.state.audioList}
					renderItem={({item}) =>
						<View style={styles.flatview}>
							<Text style={styles.audioTrack}>{item.split('_')[1]}</Text>
							{!this.state.playing?
								<Icon style={{flex:1}} name="play-circle" size={40} color="#f2a06e" onPress={() => this.playSpecificAudio(item)}/>:
								<Icon style={{flex:1}} name="stop-circle" size={40} color="#f2a06e" onPress={() => this.stopCurrentPlay()}/>
							}
							<Icon style={{flex:1}} name="delete" size={40} color="#f2a06e" onPress={() => this.deleteAudio(item)}/>
							<Icon style={{flex:1}} name="cube-send" size={40} color="#f2a06e" onPress= {() => this.sendToDevice(item)} />
						</View>
					}
					keyExtractor={(item, index) => index.toString()}
				></FlatList>
            	
            <MyButton text={'Home'} onPress={() => this.props.navigation.navigate('Home')}/>   
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
        backgroundColor:'#303c4a'
    },
    iconStyle: {
        flex:1,
        position: 'absolute',
        width: 60,
        height: 60,
        top: 3,
        left: 5
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
    justifyContent: 'space-around',
    borderWidth: 2,
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center',
    backgroundColor: '#8197ab' 
  },
  audioTrack: {
    fontSize: 20,
    color: 'white',
	flex:2,
	paddingLeft: 5
  },
  headerList: {
    fontSize:25,
    fontWeight: 'bold',
    color: '#fde789'
  }
  });
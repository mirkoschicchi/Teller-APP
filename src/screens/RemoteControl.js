import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, TextInput, Button, Image, FlatList} from 'react-native';
import Slider from '@react-native-community/slider';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyButton from '../components/MyButton';
import Speed from '../components/Speed';

export default class RemoteControl extends Component {

    static navigationOptions = {
        title: 'Remote Control',
      };
    constructor(props) {
        super(props);
        this.state = {
            speed: 100,
            host: "http://192.168.28.88:5000/",
            audioList: []
        };
        this.playRandom = this.playRandom.bind(this);
        this.pause = this.pause.bind(this);
        this.stop = this.stop.bind(this);
        this.resume = this.resume.bind(this);
        this.playOrResume = this.playOrResume.bind(this);
    }

    componentDidMount() {
        fetch(this.state.host+'controls/status', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                playing: responseJson.is_playing,
                paused: responseJson.is_paused,
                volume: responseJson.volume,
                speed: responseJson.speed
            })
        })
        .catch((error) => console.warn(error));

        fetch(this.state.host+'media/', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                audioList: responseJson
            })
        })
        .catch((error) => console.warn(error));
    }
    
    playMedia(mediaId) {
        fetch(this.state.host+'controls/play/' + mediaId, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((responseJson) => {  
            this.setState({
                playing: 1,
                paused: 0
            })
        });
    }

    playRandom () {
        fetch(this.state.host+'controls/play', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                playing: 1,
                paused: 0
            })     
        });
        
    }

    stop() {
        fetch(this.state.host+'controls/stop', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                playing: 0,
                paused: 0
            })       
        });
    }

    changeVolume(val) {
        fetch(this.state.host+'controls/volume/' + val, {
            method: 'POST',
        })
        .then((response) => response.json())
        .then((responseJson) => {      
        });
    }

    pause() {
        fetch(this.state.host+'controls/pause', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.warn("Paused")
            this.setState({
                playing: 0,
                paused: 1
            })      
        });
    }

    resume() {
        fetch(this.state.host+'controls/resume', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                playing: 1,
            })       
        });
    }


    playOrResume(mediaId) {
        fetch(this.state.host+'controls/status', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            var isPlaying = responseJson.is_playing;
            var isPaused = responseJson.is_paused;
            console.warn("play: " + isPlaying + " pause: " + isPaused)
            if(isPlaying == 0 && isPaused == 0) {  
                if(mediaId == -1) {
                    this.playRandom();
                } else {
                    this.playMedia(mediaId)
                }
            } else if(isPlaying == 0 && isPaused == 1) {
                this.resume();
            }
        })
        .catch((error) => console.warn(error));
    }

    changeSpeed(val) {
        fetch(this.state.host+'controls/speed/' + val, {
            method: 'POST',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.warn(responseJson);       
        });
    }

    delete = (mediaId) => {
        fetch(this.state.host+'media/' + mediaId, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            fetch(this.state.host+'media/', {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                audioList = responseJson;
            })
            .catch((error) => console.warn(error));   
        });
    } 

    render() {
        return(
            <ScrollView style={styles.container}>
                <Image style={styles.iconStyle} source={require('../images/logo.png')}></Image>
                <Text style={styles.titleStyle}>Remote Control</Text>
                
				<View style={{flexDirection: 'row', alignItems:"center"}}>
                    {this.state.playing == 0?
                        <Icon style={{flex:1}} name="play-circle" size={40} color="#f2a06e" onPress={() => this.playOrResume(-1)}/>:
                        <Icon style={{flex:1}} name="pause-circle" size={40} color="#f2a06e" onPress={() => this.pause()}/>
                    }
                    
                    <Icon style={{flex:1}} name="stop-circle" size={40} color="#f2a06e" onPress={() => this.stop()}/>
                </View>
                <View style={{flexDirection: 'row', alignItems:"center"}}>
                    <Icon style={{flex:1}} name="volume-high" size={40} color="#f2a06e"/>
                    <Slider
                        style={{width: 200, height: 40}}
                        minimumValue={0}
                        maximumValue={100}
                        value={this.state.volume}
                        minimumTrackTintColor="#fde789"
                        maximumTrackTintColor="#ece3f7"
                        onSlidingComplete={(val) => {
                            val = Math.round( val );
                            this.changeVolume(val)}
                        }
                        thumbTintColor="#f2a06e"
                    />

                    
                </View>
                <Speed 
                    speed={this.state.speed}
                    onPress={() => console.warn(this.state.speed)}
                    onChange={(val) => this.changeSpeed(val)}
                />      

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
							<Text style={styles.audioTrack}>{item.name}</Text>
							{this.state.playing == 0?
								<Icon style={{flex:1}} name="play-circle" size={40} color="#f2a06e" onPress={() => this.playOrResume(item.id)}/>:
								<Icon style={{flex:1}} name="pause-circle" size={40} color="#f2a06e" onPress={() => this.pause()}/>
							}
							<Icon style={{flex:1}} name="delete" size={40} color="#f2a06e" onPress={() => this.delete(item.id)}/>
						</View>
					}
				></FlatList>



                <MyButton
                    text={'Home'}
                    onPress={() => {this.props.navigation.navigate('Home')}}j
                />
                
                
                
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
    },
    flatview: {
        justifyContent: 'space-around',
        borderWidth: 2,
        padding:5,
        flexDirection: 'row',
        width: '95%',
        alignItems: 'center',
        backgroundColor: '#8197ab' 
      },
  });
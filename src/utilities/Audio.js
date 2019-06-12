import {Platform} from 'react-native';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();

import Permissions from 'react-native-permissions';

import RNFetchBlob from 'rn-fetch-blob';

export const onStartRecord = async () => {
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
        recording: true
      });
      return;
    });
    console.warn(`uri: ${uri}`);
  }

export const onStopRecord = async () => {
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


export const onStartPlay = async () => {
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


export const playSpecificAudio = async (audio) => {
    const path = Platform.select({
        ios: 'hello.m4a',
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


// export const stopCurrentPlay() {
//     this.setState({
//         playing: false
//     });
//     this.audioRecorderPlayer.stopPlayer();
// }

export const deleteAudio = (audio) => {
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
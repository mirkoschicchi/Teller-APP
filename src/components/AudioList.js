import React, {Component} from "react";
import {Stylesheet, View, Text, FlatList} from "react-native";

export default class AudioList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioList: this.props.audio
        }
    }

    render() {
        return (
            <FlatList
                data={{'ciao':'lol'}}
                >                
            </FlatList>      

          
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    h2text: {
      marginTop: 10,
      fontFamily: 'Helvetica',
      fontSize: 36,
      fontWeight: 'bold',
    },
    flatview: {
      justifyContent: 'center',
      paddingTop: 30,
      borderRadius: 2,
    },
    
  });
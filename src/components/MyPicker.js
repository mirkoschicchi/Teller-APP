import React, {Component} from 'react';
import {StyleSheet, View, Picker} from 'react-native';

export default class MyPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: ''
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Picker
                    placeholder={'Gender'}
                    selectedValue={this.state.gender}
                    style={styles.pickerStyle}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({gender: itemValue})
                    }>
                    <Picker.Item label="Male" value="Male"/>
                    <Picker.Item label="Female" value="Female" />
                </Picker>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pickerStyle: {
        flex:1,
        color: '#ffffff',
        width:'100%',
        borderRadius: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#ffc90e',
        borderWidth: 3,
        borderRadius:20,
        margin: 5
    }
  });
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class Speed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            speed:this.props.speed
        }
    }

    increase() {
        if(this.state.speed < 400) {
            this.setState({
                speed: this.state.speed + 10
            })
        }       
    }

    decrease() {
        if(this.state.speed > 10) {
            this.setState({
                speed: this.state.speed - 10
            })}
    }

    render() {
        const {onChange} = this.props;
        return(
            <View style={styles.container}>
                <Icon style={styles.icons} name="turtle" size={40} color="#f2a06e" onPress={() => this.decrease()}/>
                <Text style={styles.text} onChangeText={onChange(this.state.speed)}>{this.state.speed}%</Text>
                <Icon style={styles.icons} name="rabbit" size={40} color="#f2a06e" onPress={() => this.increase()}/>
            </View>
        )
    }

}

Speed.propTypes = {
	onChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderRadius:20,
        alignItems: 'center'
    },
    icons: {
        flex: 1,
        padding:10
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff'
    }
  });
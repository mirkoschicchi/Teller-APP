import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class Speed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            speed:1
        }
    }

    increase() {
        this.setState({
            speed: this.state.speed + 1
        })
    }

    decrease() {
        this.setState({
            speed: this.state.speed - 1
        })
    }

    render() {
        const {onPress} = this.props;
        return(
            <View style={styles.container}>
                <Icon style={styles.icons} name="turtle" size={30} color="#f2a06e" onPress={() => this.decrease()}/>
                <Text>{this.state.speed}%</Text>
                <Icon style={styles.icons} name="rabbit" size={30} color="#f2a06e" onPress={() => this.increase()}/>
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
        borderWidth: 3,
        borderRadius:20,
    },
    icons: {
        flex: 1,
        padding:10
    },
    text: {

    }
  });
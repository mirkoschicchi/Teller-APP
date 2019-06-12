import React, {Component} from 'react';
import { BleManager } from 'react-native-ble-plx';
import {View, Text} from 'react-native';

export default class Blue extends Component {
    constructor(props) {
        super(props);
        this.manager = new BleManager();
    }

    componentWillMount() {
        const subscription = this.manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                this.scanAndConnect();
                subscription.remove();
            }
        }, true);
    }

    scanAndConnect() {
        this.manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                // Handle error (scanning will be stopped automatically)
                return
            }
            console.warn(device.name)
            
            // Check if it is a device you are looking for based on advertisement data
            // or other criteria.
            if (device.name === 'TI BLE Sensor Tag' || 
                device.name === 'SensorTag') {
                
                // Stop scanning as it's not necessary if you are scanning for one device.
                this.manager.stopDeviceScan();
    
                // Proceed with connection.
            }
        });
    }

    render() {
        return(
            <View>
                <Text>Ciao</Text>
            </View>
        )
    }
}
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import HomePage from "./js/pages/HomePage"
import NavigationBar from "./js/component/NavigationBar"
export default class GithubProJect extends Component {
    render() {
        return (
            <View style={styles.container}>
                <HomePage/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

AppRegistry.registerComponent('GithubProJect', () => GithubProJect);

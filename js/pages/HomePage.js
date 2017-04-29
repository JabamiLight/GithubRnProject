/**
 * Created by guoshikeji on 17/4/7.
 */
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
    Image,
    DeviceEventEmitter,
    AsyncStorage
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage'
import MyPage from './my/MyPage'
import TrendingPages from './TrendingPages'
import SplashScreen from 'react-native-splash-screen';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'popular'
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        title="最热"
                        selected={this.state.selectedTab === "popular"}
                        renderTitleStyle={{color: "#63B8FF"}}
                        renderIcon={() =>
                            <Image style={styles.icon} source={require('../../res/images/ic_popular.png')}/>}
                        renderSelectedIcon={() =>
                            <Image style={[styles.icon, {tintColor: "#63B8FF"}]}
                                   source={require('../../res/images/ic_popular.png')}/>}
                        onPress={() => this.setState({selectedTab: "popular"})}
                    >
                        <PopularPage {...this.props}/>
                        {/*<View style={{backgroundColor: '#00F', flex: 1}}></View>*/}

                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="趋势"
                        selected={this.state.selectedTab === "trending"}
                        renderTitleStyle={{color: "#63B8FF"}}
                        renderIcon={() =>
                            <Image style={styles.icon} source={require('../../res/images/ic_trending.png')}/>}
                        renderSelectedIcon={() =>
                            <Image style={[styles.icon, {tintColor: "#63B8FF"}]}
                                   source={require('../../res/images/ic_trending.png')}/>}
                        onPress={() => this.setState({selectedTab: "trending"})}
                    >
                        <TrendingPages {...this.props}></TrendingPages>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="收藏"
                        selected={this.state.selectedTab === "favorite"}
                        renderTitleStyle={{color: "#63B8FF"}}
                        renderIcon={() =>
                            <Image style={styles.icon} source={require('../../res/images/ic_favorite.png')}/>}
                        renderSelectedIcon={() =>
                            <Image style={[styles.icon, {tintColor: "#63B8FF"}]}
                                   source={require('../../res/images/ic_favorite.png')}/>}
                        onPress={() => this.setState({selectedTab: "favorite"})}
                    >
                        <View style={{backgroundColor: '#00F', flex: 1}}></View>

                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="我的"
                        selected={this.state.selectedTab === "my"}
                        renderTitleStyle={{color: "#63B8FF"}}
                        renderIcon={() =>
                            <Image style={styles.icon} source={require('../../res/images/ic_my.png')}/>}
                        renderSelectedIcon={() =>
                            <Image style={[styles.icon, {tintColor: "#63B8FF"}]}
                                   source={require('../../res/images/ic_my.png')}/>}
                        onPress={() => this.setState({selectedTab: "my"})}
                    >
                        <MyPage {...this.props}></MyPage>
                        {/*<MyPage navigator={this.props.navigator}></MyPage>*/}
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }

    componentDidMount() {
        SplashScreen.hide();
        // AsyncStorage.clear();
        this.listener = DeviceEventEmitter.addListener("HOMEPAGE_RELOAD", (n) => {
            this.props.navigator.resetTo({
                component: HomePage
            });
        });

    }

    componentDidUnMount() {
        this.listener.remove();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        width: 26,
        height: 26
    }
});


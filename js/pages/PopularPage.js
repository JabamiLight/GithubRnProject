/**
 * Created by guoshikeji on 17/4/7.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image
} from 'react-native';


import NavigationBar from "../../js/component/NavigationBar"
import ScrollableTabView from "react-native-scrollable-tab-view"

export default class PopularPage extends Component {
    render(){
        return <View style={styles.container}>
            <NavigationBar/>
            <ScrollableTabView
                tabBarBackgroundColor="#63B8FF"
                tabBarActiveTextColor="#fff"
                tabBarInactiveTextColor="#F5FFFA"
                tabBarUnderlineStyle={{backgroundColor:"#E7E7E7",height:2}}>
                <Text tabLabel='IOS'/>
                <Text tabLabel='Android'/>
                <Text tabLabel='Java'/>
                <Text tabLabel='JavaScript'/>
            </ScrollableTabView>
        </View>;
    }



}

const styles=StyleSheet.create({
    container:{
        flex:1,
    }
});




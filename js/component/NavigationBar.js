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

export default class NavigationBar extends Component {
    render() {
        return <View >
            <View style={styles.statusBar}>
                <StatusBar
                    backgroundColor="#63B8FF"
                    hidden={false}
                    translucent={true}
                />
            </View>
            <View style={styles.navBtn}>
                <View style={styles.rightIcon}/>
                <Text style={styles.textWrapper}>热门</Text>
                <View style={{flexDirection:"row",paddingRight:10}}>
                    <Image style={styles.rightIcon} source={require("../../res/images/ic_search_white_48pt.png")}></Image>
                    <Image style={styles.rightIcon} source={require("../../res/images/ic_more_vert_white_48pt.png")}></Image>
                </View>
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    statusBar:{
        height:21
    },
    navBtn: {
        justifyContent:"space-between",
        flexDirection: "row",
        alignItems:"center",
        backgroundColor:"#63B8FF",
        paddingTop:10,
        paddingBottom:10
    },
    textWrapper:{
        fontSize:22,
        color:"#fff"
    },
    rightIcon:{
        height:25,
        width:25
    }

});


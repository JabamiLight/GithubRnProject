/**
 * Created by Yllds on 2017/4/15.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    CheckBox
} from 'react-native';

import NavigationBar from "../../component/NavigationBar"
import CustomKeyPage from "./CustomKeyPage"
import SortKeyPage from "./SortKeyPage"
export  default class MyPage extends Component {
    constructor(props) {
        super(props);
    }


    gotoCustomkey = () => {
        this.props.navigator.push({
            component: CustomKeyPage
        })
    }
    gotoSorkey = () => {
        this.props.navigator.push({
            component:SortKeyPage
        })

    }

    render() {
        return <View>
            <NavigationBar
                title="我的"
            />
            <View style={{alignItems:"center"}}>
                <Text style={styles.customKeys} onPress={this.gotoCustomkey}>自定义分类</Text>
                <Text style={styles.customKeys} onPress={this.gotoSorkey}>分类排序</Text>
            </View>
        </View>

    }
}

const styles = StyleSheet.create({
    customKeys: {
        fontSize: 21,
        marginTop: 10
    }

});


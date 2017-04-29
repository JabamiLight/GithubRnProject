/**
 * Created by guoshikeji on 17/4/7.
 */

import React, {Component, PropTypes} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image
} from 'react-native';

export default class NavigationBar extends Component {

    //属性验证
    static propTypes = {
        rightButton: PropTypes.element,
        leftButton: PropTypes.element,
        titleView: PropTypes.element,
    }
    static defaultProps = {
        title: ""
    }

    renderTitel = () => {
        let view = this.props.title.length != 0 ? <Text style={styles.textWrapper}>{this.props.title}</Text>
            : this.props.titleView;
        return view;
    }

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
                <View style={styles.leftBtn}>{this.props.leftButton}</View>
                {this.renderTitel()}
                <View style={styles.rightBtn}>
                    {this.props.rightButton}
                </View>
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    statusBar: {
        height: 21
    },
    navBtn: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#63B8FF",
        paddingTop: 10,
        paddingBottom: 8
    },
    textWrapper: {
        fontSize: 16,
        color: "#fff"
    },
    rightIcon: {
        height: 25,
        width: 25,
    },
    leftBtn: {
        flexDirection: "row",
        alignItems: "center",
        width: 50,
        marginLeft: 10,
    },
    rightBtn: {
        flexDirection: "row",
        width: 50,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "#0000"
    }

});


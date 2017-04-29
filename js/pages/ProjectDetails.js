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
    TouchableOpacity,
    AsyncStorage,
    Alert,
    DeviceEventEmitter,
    WebView

} from 'react-native';
import NavigationBar from "../../js/component/NavigationBar"
import Toast from 'react-native-easy-toast'

export default class ProjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canGoBack: false
        };
    }


    handleBack = () => {
        if (this.state.canGoBack) {
            this.refs.webview.goBack();
        }
        else {

            this.doBack();
        }

    }

    doBack = () => {
        this.props.navigator.pop();
    }
    handleNavStateChange = (s) => {
        this.setState({canGoBack: s.canGoBack});

    }

    render() {
        return <View style={styles.container}>
            <NavigationBar
                title={this.props.title.length>18?this.props.title.substring(0,15).concat("..."):this.props.title}
                leftButton={this.getNavLeftBtn()}
                rightButton={this.getNavRightBtn()}
            />
            <WebView
                ref="webview"
                startInLoadingState={true}
                source={{uri:this.props.url}}
                onNavigationStateChange={this.handleNavStateChange}
            ></WebView>

            <Toast ref="toast"/>

        </View>

    }


    getNavLeftBtn() {
        return <View>



            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.handleBack}
            >
                <Image style={{width:24,height:24}} source={require('../../res/images/ic_arrow_back_white_36pt.png')}
                >
                </Image>
            </TouchableOpacity>
        </View>

    }

    getNavRightBtn() {
        return <View style={{flexDirection:"row"}}>
            <TouchableOpacity
                activeOpacity={0.7}
            >
                <Image style={styles.rightIcon} source={require("../../res/images/ic_share.png")}></Image>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.7}
            >
                <Image style={styles.rightIcon}
                       source={require("../../res/images/ic_unstar_transparent.png")}></Image>
            </TouchableOpacity>
        </View>
    }


    componentDidMount() {
    }
}





const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1
    },
    checkbox: {
        tintColor: "#63B8FF"
    },
    rightIcon: {
        height: 25,
        width: 25
    }

});

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
    DeviceEventEmitter

} from 'react-native';

import NavigatorBar from '../../component/NavigationBar'
import CheckBox from 'react-native-check-box'
import Toast from 'react-native-easy-toast'
import ArraysUtils from '../../component/ArraysUtils'

export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Android', checked: true},
                {name: 'IOS', checked: false},
                {name: 'React Native', checked: true},
                {name: 'Java', checked: true},
                {name: 'JS', checked: true}
            ]
        };
    }


    renderCheckBox = (item) => {
        return <CheckBox
            style={{flex:1,padding: 10}}
            onClick={()=>{this.handleCBClick(item);}}
            leftText={item.name}
            isChecked={item.checked}
            unCheckedImage={<Image source={require('../../../res/images/ic_check_box_outline_blank.png')} style={styles.checkbox}/>}
            checkedImage={<Image source={require('../../../res/images/ic_check_box.png')} style={styles.checkbox}/>}
        />;
    }

    renderListCheckBox = () => {
        var views = [];
        let len = this.state.data.length;
        for (let i = 0; i < len - 2; i += 2) {
            views.push(
                <View key={`item`+i} style={{flexDirection:"row"}}>
                    {this.renderCheckBox(this.state.data[i])}
                    {this.renderCheckBox(this.state.data[i + 1])}
                </View>
            )
            if (i === 2) {
                views.push(
                    <View key="line" style={{backgroundColor:"#333",height:0.5}}>
                    </View>
                )
            }
        }


        views.push(
            <View key={`view_${len-1}`} style={{flexDirection:'row'}}>
                {len % 2 === 0 ? this.renderCheckBox(this.state.data[len - 2]) :
                    <View style={{flex:1, padding:10}}></View>}
                {this.renderCheckBox(this.state.data[len - 1])}
            </View>
        );


        return views;
    }

    handleCBClick(item) {
        item.checked = !item.checked;
    }

    handleBack = () => {
        if (ArraysUtils.isAbsEqual(this.state.data, this.originData)) {
            this.doBack();
            return;
        }
        Alert.alert("提示", "是否需要保存", [
            {
                text: "是", onPress: () => {
                this.handleSave()
            }
            },
            {
                text: "否", onPress: () => {
                this.doBack()
            }
            },
        ]);
    }

    doBack = () => {
        this.props.navigator.pop();

    }
    handleSave = () => {
        AsyncStorage.setItem('custom_key', JSON.stringify(this.state.data))
            .then(() => {
                this.refs.toast.show("保存成功");
                this.doBack();
                DeviceEventEmitter.emit('HOMEPAGE_RELOAD','HomePage重新加载');
            });
    }

    render() {
        return <View style={styles.container}>
            <NavigatorBar
                title="自定义分类"
                leftButton={this.getNavLeftBtn()}
                rightButton={this.getNavRightBtn()}
            />
            {this.renderListCheckBox()}
            <Toast ref="toast"/>

        </View>

    }


    getNavLeftBtn() {
        return <View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.handleBack}
            >
                <Image style={{width:24,height:24}} source={require('../../../res/images/ic_arrow_back_white_36pt.png')}
                >
                </Image>
            </TouchableOpacity>
        </View>

    }

    getNavRightBtn() {
        return <View style={{flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity
                onPress={this.handleSave}
                activeOpacity={0.7}>
                <View >
                    <Text style={{fontSize:16,color:'#FFF'} }>保存</Text>
                </View>
            </TouchableOpacity>
        </View>;
    }


    componentDidMount() {
        AsyncStorage.getItem("custom_key")
            .then((value) => {
                if (value !== null) {
                    console.log(value);
                    this.setState({data: JSON.parse(value)});
                }
                this.originData = ArraysUtils.clone(this.state.data);
            })
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1
    },
    checkbox: {
        tintColor: "#63B8FF"
    }

});

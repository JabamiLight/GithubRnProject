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
    TouchableHighlight,
    DeviceEventEmitter
} from 'react-native';

import NavigatorBar from '../../component/NavigationBar'
import SortableListView from "react-native-sortable-listview";
import CheckBox from 'react-native-check-box'
import Toast from 'react-native-easy-toast'
import ArraysUtils from '../../component/ArraysUtils'
var popular_def_lans = require('../../../res/data/popular_def_lans.json');

export default class SortKeyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            originData: popular_def_lans
        };
        this.state.originData.forEach(item => {
            if (item.checked) this.state.data.push(item);
        });
    }


    handleBack = () => {
        if (ArraysUtils.isAbsEqual(this.state.data, this.unSortedData)) {
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
        let originArray = this.state.originData;
        let sortedArray = this.state.data;
        let savedArray = [];
        for(var i = 0, j = 0; i < originArray.length; i++){
            var item = originArray[i];
            if(item.checked){
                savedArray[i] = sortedArray[j];
                j++;
                console.log(j);
            }else{
                savedArray[i] = item;
            }
        }
        AsyncStorage.setItem('custom_key', JSON.stringify(savedArray))
            .then(() => {
                this.refs.toast.show("保存成功");
                this.doBack();
                DeviceEventEmitter.emit('HOMEPAGE_RELOAD', 'HomePage重新加载');
            });
    }

    render() {
        return <View style={styles.container}>
            <NavigatorBar
                title="语言分类排序"
                leftButton={this.getNavLeftBtn()}
                rightButton={this.getNavRightBtn()}
            />
            <SortableListView
                data={this.state.data}
                order={Object.keys(this.state.data)}
                renderRow={row=><RowComponent data={row}/>}
                onRowMoved={
                    e=>{
                        this.state.data.splice(e.to,0,this.state.data.splice(e.from,1)[0])
                    }
                }
            />

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
                    let origin = JSON.parse(value);

                    let d = [];
                    origin.forEach((item) => {
                        if (item.checked) d.push(item);
                    });
                    this.setState({originData:origin,data: d});
                    this.unSortedData=ArraysUtils.clone(d);
                }
            })
    }
}

class RowComponent extends Component {
    static defaultProps = {
        data: {name: ''}
    }

    render() {
        return <TouchableHighlight
            underlayColor='#EEE'
            style={styles.item}
            {...this.props.sortHandlers}>
            <View style={{flexDirection:'row',paddingLeft:10}}>
                <Image source={require('../../../res/images/ic_sort.png')} style={styles.image}/>
                <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>;

    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1
    },
    item: {
        backgroundColor: '#F8F8F8',
        borderBottomWidth: 1,
        borderColor: '#EEE',
        height: 50,
        justifyContent: 'center'
    },
    checkbox: {
        tintColor: "#63B8FF"
    },
    image: {
        width: 16,
        height: 16,
        marginRight: 10,
        tintColor: '#63B8FF'
    }

});

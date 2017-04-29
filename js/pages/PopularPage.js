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
    Image,
    ListView,
    RefreshControl,
    TouchableOpacity,
    AsyncStorage,
    PanResponder,
    DeviceEventEmitter
} from 'react-native';


import NavigationBar from "../../js/component/NavigationBar"
import ScrollableTabView from "react-native-scrollable-tab-view"
import PopularProjectRow from "../component/PopularProjectRow"
import ProjectDetails from './ProjectDetails'

var popular_def_lans = require('../../res/data/popular_def_lans.json');

export default class  PopularPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            languages: []
        }
        popular_def_lans.forEach(item =>{
            if(item.checked) this.state.languages.push(item);
        });
    }

    getNavBtn = () => {
        return <View style={{flexDirection:"row"}}>
            <TouchableOpacity
                activeOpacity={0.7}
            >
                <Image style={styles.rightIcon} source={require("../../res/images/ic_search_white_48pt.png")}></Image>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.7}
            >
                <Image style={styles.rightIcon}
                       source={require("../../res/images/ic_more_vert_white_48pt.png")}></Image>
            </TouchableOpacity>
        </View>


    }


    render() {
        return <View style={styles.container}>
            <NavigationBar
                title="热门"
                rightButton={this.getNavBtn()}
            />
            <ScrollableTabView
                tabBarBackgroundColor="#63B8FF"
                tabBarActiveTextColor="white"
                tabBarInactiveTextColor="rgba(255,255,255,0.5)"
                tabBarUnderlineStyle={{backgroundColor:"#E7E7E7",height:2}}>
                {
                    this.state.languages.map((item,i)=>{
                        return (item.checked == undefined || item.checked) ? <PopularTabe {...this.props} key={`tab${i}`} tabLabel={item.name}/> : null;
                    })
                }
            </ScrollableTabView>
        </View>;
    }

    //加载用户设置的语言分类数据
    loadLanguages = () => {
        AsyncStorage.getItem('custom_key')
            .then((value) => {
                if (value != null) {
                    this.setState({languages: JSON.parse(value)});
                }
            });
    }

    componentWillMount=()=>{

    }
    componentDidMount = () => {
        //读取数据
        this.loadLanguages();


    }


}

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class PopularTabe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: ds.cloneWithRows([]),
            isRefreshing: true
        }
    }

    static defaultProps = {
        tabLabel: "Android"
    }

    handProjectRowSelected=(obj)=>{
        this.props.navigator.push({
            component:ProjectDetails,
            params:{title:obj.full_name,url:obj.html_url}
        });
    }

    renderRow = (item) => {
        return <PopularProjectRow  item={item} selected={()=>this.handProjectRowSelected(item)}></PopularProjectRow>
    }
    _onRefresh = () => {
        this.loadData();
    }

    loadData = () => {
        this.setState({isRefreshing: true});
        fetch(`https://api.github.com/search/repositories?q=${this.props.tabLabel}&sort=stars`)
            .then((response) => response.json())
            .then((responseJson) => {
                    this.setState({
                        dataSource: ds.cloneWithRows(responseJson.items),
                        isRefreshing: false
                    });
                }
            )
            .catch(
                (error) => {
                    console
                        .error(error);
                    this
                        .setState({isRefreshing: false})
                }
            ).done();
    }

    render() {

        return <View style={styles.container}>
            <ListView
                ref="ListView"
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._onRefresh}
                    tintColor="#63B8FF"
                        title="正在加载..."
                        titleColor="#63B8FF"
                        colors={['#63B8FF']}/>}
            >

            </ListView>

        </View>
    }

    componentDidMount = () => {
        // this.loadData();
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rightIcon: {
        height: 25,
        width: 25
    }
});





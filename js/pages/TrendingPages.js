/**
 * Created by Yllds on 2017/4/22.
 */
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
    AsyncStorage
} from 'react-native';


import NavigationBar from "../../js/component/NavigationBar"
import ScrollableTabView from "react-native-scrollable-tab-view"
import TrendingProjectRow from "../component/TrendingProjectRow"
import ProjectDetails from './ProjectDetails'
var popular_def_lans = require('../../res/data/popular_def_lans.json');
import GitHubTrending from 'GitHubTrending';
import JasonToast from '../../js/component/JasonToast'
import JasonDecodeDialog from '../../js/component/JasonDecodeDialog'
import Popover from '../../js/component/Popover'
import MoreMenu from '../../js/component/MoreMenu'

const TIME_MAP = new Map([
    ["今 天", "since=daily"],
    ["本 周", "since=weekly"],
    ["本 月", "since=monthly"]
]);

export default class TrendingPages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            languages: [],
            isVisible: false,
            buttonRect: {},
            timeSpan: {key: '今 天', value: "since=daily"}

        }
        popular_def_lans.forEach(item => {
            if (item.checked) this.state.languages.push(item);
        });
    }

    getNavBtn = () => {
        return <View style={{flexDirection:"row"}}>
            <TouchableOpacity
                ref="anchorView"
                activeOpacity={0.7}
                onPress={()=>{
                    this.refs.moreMenu.showPopover();
                }}
            >
                <Image style={styles.rightIcon}
                       source={require("../../res/images/ic_more_vert_white_48pt.png")}></Image>
            </TouchableOpacity>
        </View>
    }

    titlePress = () => {
        this.showPopover();
        //与java调用的回调测试
        // JasonToast.show("我擦",JasonToast.SHORT);
        // JasonDecodeDialog.alert(result=>{
        //     JasonToast.show(result,JasonToast.SHORT);
        // },error=>{
        // });
    }
    showPopover = () => {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }
    closePopover = () => {
        this.setState({isVisible: false});
    }

    renderTitleView = () => {
        return <TouchableOpacity
            activeOpacity={0.5}
            ref="button"
            onPress={this.titlePress}
        >
            <View style={{flexDirection:"row",alignItems:"center"}}>
                <Text style={{color:"#fff",fontSize:16}}>趋势 {this.state.timeSpan.key}</Text>
                <Image source={require('../../res/images/ic_spinner_triangle.png')}
                       style={{width:12,height:12,marginLeft:5,alignSelf:"flex-start"}}></Image>
            </View>

        </TouchableOpacity>
    }



    render() {
        return <View style={styles.container}>
            <NavigationBar
                titleView={this.renderTitleView()}
                rightButton={this.getNavBtn()}
            />
            <ScrollableTabView
                tabBarBackgroundColor="#63B8FF"
                tabBarActiveTextColor="#fff"
                tabBarInactiveTextColor="#F5FFFA"
                tabBarUnderlineStyle={{backgroundColor:"#E7E7E7",height:2}}>
                {
                    this.state.languages.map((item, i) => {
                        return (item.checked == undefined || item.checked) ?
                            <PopularTabe {...this.props} key={`tab${i}`} tabLabel={item.name}
                                                         timeSpan={this.state.timeSpan}/> : null;
                    })
                }
            </ScrollableTabView>
            <Popover
                contentStyle={{backgroundColor:'#343434',opacity:0.8}}
                placement="bottom"
                isVisible={this.state.isVisible}
                fromRect={this.state.buttonRect}
                onClose={this.closePopover}>
                {this.renderPopover()}
            </Popover>
            <MoreMenu ref="moreMenu" anchorView={()=>this.refs.anchorView} />
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
    componentDidMount = () => {
        //读取数据
        this.loadLanguages();
    }


    renderPopover() {

        let views = [];
        for (let [key,value] of TIME_MAP) {
            views.push(
                <TouchableOpacity
                    activeOpacity={0.5}
                    key={`pop_${value}`}
                    onPress={()=>{this.setState({timeSpan:{key:key,value:value}});this.closePopover();}}
                >
                    <Text style={styles.popitem}>{key}</Text>
                </TouchableOpacity>
            );
        }
        return <View>
            {views}
        </View>


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
        tabLabel: "Android",
        timeSpan: {}
    }

    handProjectRowSelected = (obj) => {
        this.props.navigator.push({
            component: ProjectDetails,
            params: {title: obj.fullName, url: `https://github.com${obj.url}`}
        });
    }

    renderRow = (item) => {
        return <TrendingProjectRow item={item} selected={()=>this.handProjectRowSelected(item)}></TrendingProjectRow>
    }
    _onRefresh = () => {
        this.loadData();
    }

    loadData = (item="since=daily") => {
        this.setState({isRefreshing: true});
        new GitHubTrending().fetchTrending(`https://github.com/trending/${this.props.tabLabel}?${item}`)
            .then(value => {
                this.setState({
                    dataSource: ds.cloneWithRows(value),
                    isRefreshing: false
                });
            }).catch(e => {

        }).done();
    }

    render() {

        return <View style={styles.container}>
            <ListView
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
        this.loadData();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.timeSpan.value != nextProps.timeSpan.value) {
            this.loadData(nextProps.timeSpan.value);
        }
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rightIcon: {
        height: 25,
        width: 25
    },
    popitem: {
        color: "#fff",
        fontSize: 18,
        padding: 8
    }
});





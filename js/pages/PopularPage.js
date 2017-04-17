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
    TouchableOpacity
} from 'react-native';


import NavigationBar from "../../js/component/NavigationBar"
import ScrollableTabView from "react-native-scrollable-tab-view"
import ProjectRow from "../component/ProjectRow"

export default class PopularPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            languages: ["Android", "IOS", "Java", "React", "JS"]
        }
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
                tabBarActiveTextColor="#fff"
                tabBarInactiveTextColor="#F5FFFA"
                tabBarUnderlineStyle={{backgroundColor:"#E7E7E7",height:2}}>
                {
                    this.state.languages.map((item, i) => {
                        return <PopularTabe key={`tabs${i}`} tabLabel={item}/>
                    })
                }

            </ScrollableTabView>
        </View>;
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

    renderRow = (item) => {
        return <ProjectRow item={item}></ProjectRow>
    }
    _onRefresh = () => {
        this.loadData();
    }

    loadData = () => {
        console.log(this.props.tabLabel);
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





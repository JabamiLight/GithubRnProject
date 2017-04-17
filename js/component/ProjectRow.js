/**
 * Created by Yllds on 2017/4/8.
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


    static defaultProps = {
        item: {}
    }

    render() {
        var item = this.props.item;
        return <View style={styles.container}>
            <Text style={styles.title}>{item.full_name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.bottom}>
                <View style={styles.autherWrapper}>
                    <Text>作者:</Text>
                    <Image style={{width:22,height:22,marginLeft:2}} source={{uri:item.owner.avatar_url}}></Image>
                </View>
                <View style={styles.starWrapper}>
                    <Text>星:</Text>
                    <Text>{item.stargazers_count}</Text>
                </View>
                <Image style={{width:22,height:22}} source={require('../../res/images/ic_unstar_transparent.png')}></Image>
            </View>
        </View>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10,
        borderColor:"#ddd",
        borderWidth:0.5,
        marginLeft:5,
        marginRight:5,
        marginTop:5,
        marginBottom:5,
        borderRadius:2,
        //ios阴影
        shadowColor:"gray",
        shadowOffset:{width:0.5,height:0.5},
        shadowRadius:1,
        shadowOpacity:0.4,
        elevation:2//android阴影

    },
    icon: {
        width: 26,
        height: 26
    },
    autherWrapper: {
        flexDirection: "row"

    },
    starWrapper: {
        flexDirection: "row"
    },
    bottom:{
        flexDirection:"row",
        justifyContent:"space-between"

    },
    title:{
        color:"#333",
        fontSize:16,
        marginBottom:2,

    },

    description:{
        fontSize:12,
        marginBottom:2,
    }

});



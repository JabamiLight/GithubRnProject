/**
 * Created by Yllds on 2017/4/23.
 */

import React, {Component,PropTypes} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
} from 'react-native';


import Popover from './Popover'


export const MORE_MENU = {
    Custom_key: '自定义分类',
    Sort_Key: '语言排序',
    Share: '分享'
};


export  default class MoreMenu extends Component {
    static propTypes = {
        anchorView: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            buttonRect: []
        };
    }

    showPopover =()=>{
        let anchorView = this.props.anchorView();
        console.log(anchorView);
        console.log(123);
        anchorView.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }
    closePopover = () => {
        this.setState({isVisible: false});
    }
    render() {
        return <Popover
            isVisible={this.state.isVisible}
            fromRect={this.state.buttonRect}
            onClose={this.closePopover}
            contentStyle={{backgroundColor:'#343434',opacity:0.8}}
            placement="bottom">
            {this.renderOptions()}
        </Popover>
    }

    renderOptions = () => {
        var views = [];
        for (let opt in MORE_MENU) {
            views.push(<TouchableOpacity key={`pop_${opt}`} onPress={()=>this.handleOptionSelect(opt,MORE_MENU[opt])}>
                <Text style={{fontSize:18,color:'#FFF',padding:8}}>{MORE_MENU[opt]}</Text>
            </TouchableOpacity>);
        }
        return <View style={{alignItems:'center'}}>
            {views}
        </View>;
    }

    handleOptionSelect(opt, moremenu) {
        switch (opt) {
            case MORE_MENU.Share:
                break;
        }
        this.closePopover();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

});

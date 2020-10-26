import React, { Component } from 'react'
import { ActivityIndicator, PullToRefresh, SearchBar } from 'antd-mobile';

//引入scss
import "./SearchGoods.scss"

import { searchGoods } from 'api/index'
import Cell from '../../../components/cell/Cell';
export default class SearchGoods extends Component {
    
    state = {
        goodsList : [],
        animating : false,
    }

   async componentDidMount(){
        const goodsValue = this.props.match.params.goodsValue
        const data = await searchGoods(goodsValue)
        this.setState({
            goodsList:data.message.goods
        })
    }
    render() {
        return (
            <div>
               {/* 页面未加载完成显示加载标志 */}
               <ActivityIndicator
                    toast  
                    text="拼命加载啊..."
                    animating={this.state.animating}
                />
                {/* 搜索栏 */}
                <div className = {"search-content"} >
                    <i className = {"iconfont icon-arrow-left"}
                    style={{width:30 , alignSelf:"center" ,padding: '0 10px'}}
                    onClick={()=>this.props.history.goBack()}>
                    </i>
                    <SearchBar placeholder="搜索你感兴趣的商品"
                    onFocus={() => this.props.history.push('/searchfield')}
                    style={{flex: 1}}
                    />
                </div>
                {/* 商品列表 */}
                <PullToRefresh 
                // damping为拉动的距离限制
                damping={100}
                ref={el=> this.ptr = el}
                >
                <Cell goods= {this.state.goodsList}/>
                
                </PullToRefresh>
            </div>
        )
    }
}

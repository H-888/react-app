import { SearchBar, WingBlank } from 'antd-mobile'
import React, { Component } from 'react'
import { searchSuggest } from 'api/index'
import "./SearchField.scss"
 export default class SearchField extends Component {
    state = {
        suggestData: [], // 搜索建议查询的数据
    }
    // 点击搜索建议跳转商品列表页面
    handleSeachSimilar = cid => {
        this.props.history.push('/searchgoods/cid=' + cid)
    }
    // 点击搜索或者回车跳转到商品列表页面
    handleSeach = value => {
        this.props.history.push('/searchgoods/query=' + value)
    }
    handleSearchSuggest = value => {
        searchSuggest(value).then(res => {
            console.log(res);
            const { meta: { status }, message: { goods } } = res
            if (status === 200) {
                this.setState({
                    suggestData: goods.slice(0, 10)
                })
            }
        })
    }
    componentDidMount() {
        // 自动聚焦
        this.autoFocusInst.focus()
    }
    componentWillUnmount(){
        // 结束掉完成的异步任务 要不然会报警告
        this.setState = () => false
    }
    render() {
        return (
            <div style={{ height: "100%", backgroundColor: '#efeff4' }}>
                <div style={{ display: 'flex' }}>
                    <i className={"iconfont icon-arrow-left"}
                        style={{ width: 30, alignSelf: "center", padding: "0 10px" }}
                        onClick={() => this.props.history.push('/')}>
                            
                    </i>
                    <SearchBar placeholder={"请输入商品"}
                        style={{ flex: 1 ,width:"100%"}}
                        onCancel={v => this.handleSeach(v)} //点击取消按钮触发 (不再自动清除输入框的文字) 
                        onSubmit={v => this.handleSeach(v)} //submit 事件 (点击键盘的 enter)
                        ref={ref => this.autoFocusInst = ref}
                        cancelText={"搜索"}
                        onChange={v => {
                            // 中文输入法下输入时会出现英文, 如n'i'h'a'o
                            //通过判断是否带有此符号来判断是否继续获取搜索建议
                            if (v.indexOf("'") === -1) {
                                this.handleSearchSuggest(v)
                            }
                        }}
                    />
                </div>
                {/* 搜索建议查询的数据渲染*/}
                <WingBlank>
                    <ul className="suggest-list">
                        {
                            this.state.suggestData.map(v => (
                                <li key={v.goods_id} onClick={()=>this.handleSeachSimilar(v.cat_id)}>
                                    <span className="left">{v.goods_name.slice(0, 20)}...</span>
                                    <span className={"right"}>↖</span>
                                </li>
                            ))
                        }
                    </ul>
                </WingBlank>
            </div>
        )
    }
}


import React, { PureComponent,Fragment } from 'react'
import { Carousel, SearchBar, WhiteSpace } from 'antd-mobile';
import homeActionCreator from '../../store/actionCreator/home'
import { withRouter } from 'react-router-dom'

// 引入轮播图图片
import banner1 from 'assets/img/banner1.png';
import banner2 from 'assets/img/banner2.png';
import banner3 from 'assets/img/banner3.png';
import { baseUrl } from 'api/index';

// 引入样式
import "./home.scss";

//引入状态管理
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

//引入通用组件
import Cell from '../../components/cell/Cell'
class Home extends PureComponent {

    componentDidMount() {
        this.props.getGoodsList()
    }
   
    render() {
        return (
            <Fragment>
                { this.props.location.pathname === '/' ?
                  (
                    <div>
                    {/* 搜索栏 */}
                    <SearchBar
                        placeholder={""}
                        className="search-area"
                        onFocus={()=>{this.props.history.push("/searchfield")}}
                    />
                    {/*  // 轮播图区域 */}
                    <Carousel
                        autoplay={true} // 是否自动切换
                        infinite        //是否循环播放
                        style={{ marginTop: 44 }}
                    >
                        <img src={banner1} alt=""/>
                        <img src={banner2} alt=""/>
                        <img src={banner3} alt=""/>
                    </Carousel>
                    {/* 分类 */}
                    <div className="catitems">
                        <div onClick={()=>this.props.history.push('/searchgoods/query=分类')}><img src={`${baseUrl}/pyg/icon_index_nav_4@2x.png`} alt=""/></div>
                        <div onClick={()=>this.props.history.push('/searchgoods/query=超市')}><img src={`${baseUrl}/pyg/icon_index_nav_2@2x.png`} alt="" /></div>
                        <div onClick={()=>this.props.history.push('/searchgoods/query=母婴')}><img src={`${baseUrl}/pyg/icon_index_nav_1@2x.png`} alt="" /></div>
                        <div onClick={()=>this.props.history.push('/searchgoods/query=充值')}><img src={`${baseUrl}/pyg/icon_index_nav_5@2x.png`} alt="" /></div>
                    </div>
                    {/* 首页商品列表区域 */}
                    <div className="goodsList">
                        {
                        this.props.goodsList && this.props.goodsList.map(item => (
                                <div key={item.group_img} className={"goods"}>
                                    {/* WhiteSpace：上下留白 size表示留白的程度 */}
                                    <WhiteSpace size="sm" />
                                    <img src={item.group_img} alt="" />
                                    <Cell goods={item.goods}></Cell>
                                </div>
                            )) 
                        }
                    </div>
                    {/* 根据this.props.goodsList是否有数据显示不同的 */}
                    {
                        this.props.goodsList.length !== 0 ?
                            (
                                <div className="goods-list-bottom">
                                    <div className="line">
                                        <span>我是有底线的~</span>
                                    </div>
                                </div>
                            )
                            : ("")
                    }
    
                </div>
                ) : ""
                }
            </Fragment>
        )
    }
}

//将状态映射到属性当中
//该函数负责当前的组件所需要的数据
function mapStateToProps(state) {
    return {
        goodsList: state.home.goodsList
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(homeActionCreator, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))

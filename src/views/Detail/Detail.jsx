import React, { Component } from 'react'
import { NavBar, Icon, Carousel, WingBlank, WhiteSpace, SegmentedControl, Badge } from 'antd-mobile'
import { getGoodsDetail } from "api/index"
import { connect } from 'react-redux'
import "./Detail.scss"
import cartTypes from '../../store/actionTypes/cart'
import { withRouter } from 'react-router-dom'
import { addCart } from '../../api'
// 创建映射状态的函数
const mapStateToProps = state => ({
    totalNum: state.cart.totalNum,
    loginState: state.user.loginState
})
// 创建映射dispatch函数
const mapDispatchToProps = dispatch => ({
    addCart: () => {
        dispatch({ type: cartTypes.ADD_CART })
    },
    buyNow: (selectedGoodsTotalNum, totalPrice) => {
        dispatch({ type: cartTypes.BUY_NOW, payload: { selectedGoodsTotalNum, totalPrice } })
    }
})

@connect(mapStateToProps, mapDispatchToProps) class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            animating: false,
            displayOne: "block",
            displayTwo: "none"
        }
    }
    async componentWillMount() {
        // 一开始设置等待
        this.setState({ animating: true })
        //    获取商品详情数据
        const data = await getGoodsDetail(this.props.match.params.id)
        console.log(data);

        if (data.meta.status) {
            this.setState({
                data: data.message
            })
        }
    }
    componentWillUnmount() {
        this.setState = () => false
    }

    // 添加商品到购物车
    addGoodsToCart = () => {
        // 如果已登录，就直接添加到购物车
        console.log(this.props.loginState);
        if (this.props.loginState) {

            let info = {}
            info.cat_id = this.state.data.cat_id
            info.goods_id = this.state.data.goods_id
            info.goods_name = this.state.data.goods_name
            info.goods_number = this.state.data.goods_number
            info.goods_price = this.state.data.goods_price
            info.goods_small_logo = this.state.data.goods_small_logo
            info.goods_weight = this.state.data.goods_weight
            info = JSON.stringify(info)
            addCart(info).then(res => {
                console.log(res);
                const { meta: { status } } = res

            })

        }

    }

    render() {
        const { data: { pics, goods_name, goods_price,
            add_time, goods_number, goods_introduce, attrs, totalNum }
            , displayOne, displayTwo, } = this.state

        return (
            <div>
                {/* 顶部导航条 */}
                <NavBar
                    mode="dark"
                    leftContent={<Icon type='left' />}
                    onLeftClick={() => this.props.history.goBack()}
                    className="nav-bar-style"
                >商品详情</NavBar>
                {/* 轮播图区域 */}
                <Carousel
                    // 自动轮播
                    autoplay={true}
                    infinite
                    style={{
                        marginTop: 45
                    }}
                >
                    {pics && pics.map(val => (
                        <img key={val.pics_id}
                            src={val.pics_mid}
                            alt=""
                            style={{ width: '100%', height: "auto", verticalAlign: 'top' }}
                            // 图片加载完取消等待
                            onLoad={() => {
                                this.setState({ animating: false })
                            }}
                        />
                    ))}
                </Carousel>
                {/* 商品内容 */}
                <div className={"good-content"}>
                    <div className="goods-describe">{goods_name}</div>
                    <div className="good-price"><span>&yen;</span>{goods_price}</div>
                </div>
                <WingBlank size={"lg"} className={"good-wrap"}>
                    <div className={"good-select"}>
                        <ul>
                            <li>
                                <span>上架的时间</span>
                                <span>{new Date(parseInt(add_time) * 1000).toLocaleString().replace(/\//g, '-').slice(0, 9).replace('8', '9')}</span>
                            </li>
                            <li>
                                <span>库存</span>
                                <span>{goods_number}</span>
                            </li>
                            <li>
                                <span>促销</span>
                                <span>是</span>
                            </li>
                            <li>
                                <span>运费</span>
                                <span>免运费</span>
                            </li>
                        </ul>
                    </div>
                    <WhiteSpace />
                    {/* 分段器 */}
                    <SegmentedControl
                        values={['图文详情', '规格参数']}
                        onValueChange={v => {
                            console.log(v);
                            // 根据分段器后的值,切换图片详情
                            v === '图文详情' ? this.setState({
                                displayOne: 'block',
                                displayTwo: 'none'
                            }) : this.setState({
                                displayOne: 'none',
                                displayTwo: 'block'
                            })
                        }}
                    >

                    </SegmentedControl>
                </WingBlank>
                {/* 图片详情 */}
                <div style={{ display: displayOne }} dangerouslySetInnerHTML={{ __html: goods_introduce }}></div>
                {/* 规格参数 */}
                <div style={{ display: displayTwo }}>
                    {
                        attrs && attrs.map(v => (
                            <div key={v.attr_id} className="good-param">
                                <div>{v.attr_name.split('-')[0]}</div>
                                <div>
                                    <span>{v.attr_name.split('-')[1]}</span>
                                    <span>{v.attr_vals}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                {/* 页面底部加入购物车 */}


                <div>
                    <div className={"goods-footer"}>
                        <div className={"goods-footer-item cart"}>
                            <span className="iconfont icongouwuche1">
                                <Badge
                                    text={totalNum}
                                    overflowCount={50}
                                    style={{
                                        position: 'absolute',
                                        width: 'auto',
                                        height: 'auto',
                                        top: '-20px',
                                        right: '-18px',
                                        fontSize: 8,
                                        borderRadius: '50%',
                                        backgroundColor: '#e4393c',
                                        textAlign: 'center',
                                        color: 'white'
                                    }}>
                                </Badge>
                            </span>
                        </div>
                        <div className="goods-footer-item add" onClick={this.addGoodsToCart}>
                            <span>加入购物车</span>
                        </div>
                        <div className={"goods-footer-item buy"}>
                            <span>立即购买</span>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}
export default withRouter(Detail)

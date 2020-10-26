import { SwipeAction, WingBlank, Stepper, Toast, Modal, Checkbox, } from 'antd-mobile';
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { getCartGoods, syncCart } from '../../api';
import emptyCart from '../../assets/img/cart_empty.png'
import "./Cart.scss"
const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;
interface CART_INFOS{
    [name:number]:any;
}
const Cart: React.FC<any> = ({ history ,snycCartGoods}): JSX.Element => {
    // 购物车数据 格式为{goods_id:购物车信息}
    const [cart_infos, set_cart_infos] = useState({})
    // 购物车是否为空，否的话为空
    const [cart_infos_status, set_cart_infos_status] = useState(true)
    // stepper改变数量的值
    const [num, setNum] = useState('');
    // totalPrice 是底部的总价
    const [totalPrice, setTotaPrice] = useState(0)
    // allStatus是全选按钮是否选中，默认不选中
    const [allStatus, setAllStatus] = useState(false)
    // 右下角选择去结算的商品种类数量
    const [allSelectedNum, setAllSelectedNum] = useState(0)
    // 选择商品的总个数 商品种类*单个商品的amount
    const [selectedGoodsTotalNum, setSelectedGoodsTotalNum] = useState(0)
    // toalNum 为购物车商品种类的数量
    const [totalNum, setToalNum] = useState(0)
    // manage是为了点击右上角的管理时，是否显示底部的删除按钮
    const [manage, setManage] = useState(true)

    useEffect(() => {
        // 计算总价    
        calTotalPrice()
        // 同步购物车
        syncCartGoodsData()
    })
    


    const init = () => {
        getCartGoods().then(res=> {
            // 将数据解构处理
            const { meta: { status }, message: { cart_info } } = res
            // 状态码200表示获取购物车的数据成功
            if(status === 200){
                // 判断购物车是否为空
                if(Object.values(JSON.parse(cart_info)).length){
                    // 不为空的话设置其标志，以便是否显示购物车为空的标志，并将购物车数据解析后存入state的cart_infos
                    let cart_infos = JSON.parse(cart_info)
                    for(let goods_id in cart_infos){
                        cart_infos[goods_id].selectedStatus = false;
                    }
                    set_cart_infos(cart_infos)
                    set_cart_infos_status(true)
                    // Object.values(JSON.parse(cart_infos)).length
                    setToalNum(3)
                }else{
                    //否则购物车为空的图片标志设为false
                    set_cart_infos_status(false)
                }
            }
        })
    }
    // 同步购物车数据
    const syncCartGoodsData = () => {
        syncCart({infos:JSON.stringify(cart_infos)})
        // 计算CartReducer中的totalNum
        snycCartGoods(cart_infos,totalPrice,selectedGoodsTotalNum)
    }
    // 改变商品数量（stepper）
    const handleUpdateNum = (num:any, goods_id:number) => {
        // 更新被点击的商品的数量
        let news_cart_infos:CART_INFOS = {...cart_infos}
        news_cart_infos[goods_id].amount = num;
        setNum(num)
        set_cart_infos(news_cart_infos)
     }
    //  改变对应商品是否为选择的状态
     const changeSingleSelectedStatus = (ele:any, goodId: any) => {
        //  同步状态
        let news_cart_infos:CART_INFOS = {...cart_infos}
        news_cart_infos[goodId].selectedStatus = ele.target.checked
        // 判断所有的商品是否为选中状态
        isAllSelected()
        // 计算总价
        calTotalPrice()
        // 更新购物车的商品信息
        set_cart_infos(news_cart_infos)
        //判断是增减商品的数量
        setAllSelectedNum(ele.target.checked ? allSelectedNum + 1 : allSelectedNum - 1)
      }
    //判断所有的商品是否选中
    const isAllSelected = () => {
        //预设全选的状态为true
        let allSelected = true
        // 循环判断每个商品是否选中
        let news_cart_infos:any = {...cart_infos}
        for(let goods_id in cart_infos){
            if(news_cart_infos[goods_id].selectedStatus){
                // 如果有一个没选中，则设置全选状态为false，并跳出循环
                allSelected = false;
                break
            }
            setAllStatus(allSelected)
        }   
    }
    // 点击全选框
    const handleAllChecked = () => {
        // 获取商品信息
        let news_cart_infos:any = {...cart_infos}
        // 循环遍历每个商品,设置是否选中,与allStatus同步
        for (let goods_id in cart_infos) {
            news_cart_infos[goods_id].selectedStatus = allStatus
        }
        set_cart_infos(news_cart_infos)
        setAllSelectedNum(allStatus ? Object.values(news_cart_infos).length : 0)
        // 计算总价
        calTotalPrice()
     }  
    //  计算总价
    const calTotalPrice = () => {
        let newsTotalPrice = 0;
        let newsSelectedGoodsTotalNum = 0
        let news_cart_infos:any = {...cart_infos}
        for(let goods_id  in cart_infos){
            if(news_cart_infos[goods_id].selectedStatus){
                newsTotalPrice += news_cart_infos[goods_id].amount * news_cart_infos[goods_id].goods_price
                newsSelectedGoodsTotalNum += news_cart_infos[goods_id].amount
            }
        }
        setTotaPrice(newsTotalPrice)
        setSelectedGoodsTotalNum(newsSelectedGoodsTotalNum)
    }
    // 删除单个商品
    const handleDeleteSingleGoods = (good_id: any) => { 
        let news_cart_infos:any = cart_infos
        // 删除对应id的商品
        delete news_cart_infos[good_id]
        set_cart_infos(news_cart_infos)

        setToalNum(Object.values(news_cart_infos).length)

        setAllSelectedNum(allSelectedNum ? allSelectedNum -1 : 0)

        set_cart_infos_status(!Object.values(news_cart_infos).length ? false : true)
    }
    
    // 批量删除商品
    const handleDeleteBatchGoods = () => {
        // 获取副本
        let news_cart_infos:any = cart_infos
        // 循环判断哪些商品被选中, 选中的直接删除
        for(let goods_id in news_cart_infos){
            // 如果selectedStatus 即被选中 删除掉
            if(news_cart_infos[goods_id].selectedStatus){
                delete news_cart_infos[goods_id]
            }
        }
        // 这里因为选中了商品,所有计算了所选中的商品的总价和总商品数量,
        // 故点击删除的时候要清零,否则删除后数字还在
        set_cart_infos(news_cart_infos)
        setTotaPrice(0)
        setAllSelectedNum(0)
        setSelectedGoodsTotalNum(0)
        setToalNum(Object.values(news_cart_infos).length)
        set_cart_infos_status(!Object.values(news_cart_infos).length? false: true)

    }
   
    const gotoPay = () => {
        // 提交订单之前判断是否选择了商品
        if(allSelectedNum){
            Toast.fail("您还没有选择宝贝呢",2)
            return
        }
         // 将CartReucer中保存的数据更新
         snycCartGoods(cart_infos,totalPrice,selectedGoodsTotalNum)
         Toast.fail("敬请期待",2)
     }
  
    
   



    useEffect(()=>{
        init()
    },[])
    return (
        <div>
            {/* 顶部导航条 */}
            <nav className={'nav-header'}>
                <div className={'nav-header-center'}>
                    购物车{totalNum || ""}
                </div>
                <div className={'nav-header-right'}>
                    <span onClick={() => { setManage(manage ? false : true) }} className={"manage"}>
                        {manage ? "管理" : "完成"}
                    </span>
                </div>
            </nav>
            {
                cart_infos_status ? (
                    <WingBlank style={{ marginBottom: "1.6rem" }}>
                        <div className={"order-list"} style={{ marginTop: "1.46666rem" }}>
                            {Object.values(cart_infos).map((v: any) => (
                                <SwipeAction
                                key={v.goods_id}
                                style={{ marginBottom: "0.133333rem" }}
                                autoClose
                                right={[
                                    {
                                        text: '取消',
                                        style: { backgroundColor: '#ddd', color: 'white' },
                                    },
                                    {
                                        text: '删除',
                                        style: { backgroundColor: '#F4333C', color: 'white' },
                                        onPress: () => alert('删除该宝贝', '确定吗?', [
                                            {
                                                text: '我再想想',
                                                style: {
                                                    backgroundColor: '#777',
                                                    color: '#fff',
                                                    fontWeight: 700
                                                }
                                            },
                                            {
                                                text: '删除',
                                                style: {
                                                    backgroundColor: 'rgb(244, 51, 60)',
                                                    color: '#fff',
                                                    fontWeight: 700
                                                },
                                                onPress: () => handleDeleteSingleGoods(v.goods_id)
                                            },
                                        ]),
                                    },
                                ]}
                            >
                                <CheckboxItem
                                    checked={v.selectedStatus}
                                    onChange={(e: HTMLElement) => (changeSingleSelectedStatus(e, v.goods_id))}
                                >
                                    <div className={'single-order'}>
                                        <img src={v.goods_small_logo} onClick={() => history.push(`/goodsdetail/${v.goods_id}`)} alt="" />
                                        <div className={'order-content'}>
                                            <div className={'order-title ellipsis-2'}
                                                onClick={() => history.push(`/goodsdetail/${v.goods_id}`)}
                                            >{v.goods_name}</div>
                                            <Stepper
                                                showNumber
                                                max={v.goods_number}
                                                min={1}
                                                defaultValue={v.amount}
                                                onChange={num => handleUpdateNum(num, v.goods_id)}
                                            />
                                            <div className={'order-price'}>
                                                <span>&yen;</span>
                                                <span>{v.goods_price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CheckboxItem>
                            </SwipeAction>
                            ))}
                        </div>
                    </WingBlank>
                ) : (
                        <div className="empty-cart">
                            {/* 此处的图片不能直接写路径，只能通过import的方式将它引入进来 */}
                            <img src={emptyCart} alt="" className="empty-cart-img" />
                            <div className="empty-cart-text1">购物车竟然是空的！</div>
                            <div className="empty-cart-text2">再忙，也要记得买点什么犒劳自己~</div>
                            <div className="btn" onClick={() => history.push('/')}>去逛逛</div>
                        </div>
                    )
            }
            <div className={"cart-footer"}>
                <div className={'cart-footer-left'}>
                    <CheckboxItem
                        checked={allStatus}
                        onChange={() => {
                            setAllStatus(!allStatus)
                        }}
                    >全选</CheckboxItem>
                </div>
                {manage && (
                    <div className={'cart-footer-center'}>
                        <span>合计：</span>
                        <span className="total-price">￥ {totalPrice}</span>
                    </div>
                )}
                {
                    manage ? (
                        <div className="cart-footer-right" onClick={gotoPay}>
                            <span className="goto-pay">结算{allSelectedNum && allSelectedNum}</span>
                        </div>
                    ) : (
                        <button className={"delete-batch"}
                        onClick={() => selectedGoodsTotalNum? alert(`删除这${allSelectedNum}个宝贝`, '确定吗?', [
                            {
                                text: '我再想想', style: {
                                    backgroundColor: '#777',
                                    color: '#fff',
                                    fontWeight: 700
                                }
                            },
                            {
                                text: '删除', style: {
                                    backgroundColor: 'rgb(244, 51, 60)',
                                    color: '#fff',
                                    fontWeight: 700
                                }, onPress: () => {handleDeleteBatchGoods()}
                            },
                        ]):Toast.fail('您还没选择宝贝呢',2)}
                        >
                            删除
                        </button>
                    )
                }
            </div>
        </div>
    )
}
const mapDispatchToPorps = (dispatch:any) => {
    return {
        // 同步购物车数据
        snycCartGoods: (cart_Infos:any, totalPrice:any, selectedGoodsTotalNum:any) => {
            dispatch({ type: 'SYNC_CART_GOODS', payload: { cart_Infos, totalPrice, selectedGoodsTotalNum } })
        }
    }
}  

export default connect(null,mapDispatchToPorps)(Cart)

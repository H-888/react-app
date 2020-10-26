import { Button, Card, TabBar , Modal} from 'antd-mobile'
import React, { useState,useEffect } from 'react'
import avatar from 'assets/img/avatar.png'
import { connect } from 'react-redux'
import userTypes from '../../store/actionTypes/user'
import { withRouter } from 'react-router-dom'
import { getUserInfo } from '../../api/index'
const User: React.FC<any> = ({ history,loginOut,clearCartData }) => {
    const [phone, setPhone] = useState()
    const alert:Function = Modal.alert;
    useEffect(()=>{
        getUserInfo().then(res=>{
            console.log(res);
        })
    },[])
    // 退出
    const logout = ():void => {
        alert("即将退出账号","您确定吗?",[
            {
                text:"我还没逛完",
                style:{
                    backgroundColor:"#777",
                    color:'#fff',
                    fontWeight:700
                },
            },{
                text: '确定', 
                style: {
                    backgroundColor: 'rgb(244, 51, 60)',
                    color: '#fff',
                    fontWeight: 700
                }, 
                onPress: ():void =>{
                    // 退出
                    loginOut()
                    // 清除cartReducer中的数据
                    clearCartData()
                    
                    history.push("/noLoginUser")
                }
            },
        ])
    }
    return (
        <div>
            <Card>
                <Card.Header
                    title={"007"}
                    thumb={avatar}
                    thumbStyle={{ width: 43 }}
                    style={{ fontSize: 15 }}
                    extra={<span style={{ fontSize: 13 }}>{phone}</span>}
                />
                <Card.Header
                    title={"我的订单"}
                    style={{ fontSize: 15 }}
                />
            </Card>
            <TabBar
                unselectedTintColor={"#949494"}
                tintColor={"#33A3F4"}
                barTintColor={"white"}
            >
                <TabBar.Item
                    title="所有订单"
                    key="Home"
                    icon={<i className="iconfont icon-dingdan"></i>}
                    onPress={() => { history.push('/order/0') }}
                >
                </TabBar.Item>
                <TabBar.Item
                    title="待付款"
                    key="obligation"
                    icon={<i className="iconfont icon-daifukuan"></i>}
                    onPress={() => { history.push('/order/1') }}
                >
                </TabBar.Item>
                <TabBar.Item
                    title="待发货"
                    key="Mine"
                    icon={<i className="iconfont icon-daifahuo"></i>}
                    onPress={() => { history.push('/order/2') }}
                >
                </TabBar.Item>
            </TabBar>
            <Button onClick={logout}>退出登录</Button>
        </div >
    )
}

const mapDispatchToProps = (dispatch:any):Object => {
    return {
        // 退出
        loginOut:()=>{
            dispatch({type:userTypes.LOGINOUT})
        },
        // 清除cartReducer中的数据
        clearCartData:()=>{
            dispatch({type:"CLEAR"})
        }
    }
}

export default connect(null,mapDispatchToProps)(withRouter(User))

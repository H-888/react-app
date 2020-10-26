import React  from 'react'
import { Flex, TabBar, WingBlank } from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import "./NoLoginUser.scss"
const NoLoginUser:React.FC<any> = ({history}) => {
    return(
        <div>
          <header>
              <div className={'title'}>我的</div>
              <WingBlank style={{marginTop:"0.533rem"}}>
                    <Flex justify={"between"}>
                        <div className={"avatar"}>
                            <div className={"wrapper"}>
                                <i className={'iconfont icon-icontouxiang'}></i>
                            </div>
                            <span>未登录</span>
                        </div>
                        <button className={"goto-login"} onClick={()=>{
                            history.push("/login")
                        }}>立即登录</button>
                    </Flex>
              </WingBlank>
          </header>
          <div className={"my-order"}>我的订单</div>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
          >
            <TabBar.Item
                title={"所有订单"}
                key={'Home'}
                icon={<i className={'iconfont icon-dingdan'}></i>}
                onPress={()=>{history.push('/order/0')}}
            >
            </TabBar.Item>
            <TabBar.Item
                title="待付款"
                key={"obligation"}
                icon={<i className={'iconfont icon-daifukuan'}></i>}
                onPress={()=>{history.push("/order/1")}}
            >
            </TabBar.Item>
            <TabBar.Item
                title="待发货"
                key={"Mine"}
                icon={<i className={'iconfont icon-daifahuo'}></i>}
                onPress={()=>{history.push("/order/2")}}
            >
            </TabBar.Item>
          </TabBar>
        </div>
    )
}

export default withRouter(NoLoginUser)

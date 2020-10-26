import React from 'react';
import { TabBar,ActivityIndicator } from 'antd-mobile';
import { connect } from 'react-redux'

@connect(state=>({loginState:state.user.loginState}))
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      fullScreen: true,
      animating : true
    };
  }
 
  render() {
    const {location} = this.props
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
         {/* <ActivityIndicator
                    toast  
                    text="拼命加载啊..."
                    animating={this.state.animating}
                /> */}
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="home"
            icon={<i className="iconfont iconhome"></i>}
            selectedIcon={<i className="iconfont iconhome" style={{color: '#33A3F4'}}></i>}
            selected={this.props.location.pathname === "/"}
            onPress={() => {this.props.history.push("/")}}
          >
          {this.props.children}
          </TabBar.Item>
          <TabBar.Item
             icon={<i className="iconfont icon-fenlei"></i>}
             selectedIcon={<i className="iconfont icon-fenlei" style={{color: '#33A3F4'}}></i>}
            title="分类"
            key="category"
            selected={this.props.location.pathname === "/category"}
            onPress={() => {{this.props.history.push("/category")} }}
          >
           {this.props.children}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icongouwuche1"></i>}
            selectedIcon={<i className="iconfont icongouwuche1" style={{color: '#33A3F4'}}></i>}
            title="购物车"
            key="cart"
            selected={this.props.location.pathname === "/cart"}
            onPress={() => {this.props.history.push("/cart")}}
          >
            {this.props.children}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont iconweibiaoti2fuzhi12"></i>}
            selectedIcon={<i className="iconfont iconweibiaoti2fuzhi12" style={{color: '#33A3F4'}}></i>}
            title="未登录"
            key="user"
            selected={['/login','/reg', '/noLoginUser','/user'].includes(location.pathname)}
            onPress={() => {this.props.loginState? this.props.history.push('/user'):this.props.history.push("/noLoginUser")}}
          >
            {this.props.children}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default Layout
import React from 'react';
import { TabBar } from 'antd-mobile';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      fullScreen: true,
    };
  }

  render() {
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
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
            onPress={() => {this.props.history.push("/category")}}
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
            selected={this.props.location.pathname === "/user"}
            onPress={() => {this.props.history.push("/user")}}
          >
            {this.props.children}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default Layout
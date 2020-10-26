import React, { PureComponent, Fragment } from 'react'
import { NavBar,  Tabs } from "antd-mobile"
import { getCategory } from 'api/index'
import {withRouter} from 'react-router-dom'
import './Category.scss'

 class Category extends PureComponent {
    state = {
        data: []
    }
    async componentDidMount() {
        const { meta: { status }, message: data } = await getCategory()
        if (status === 200) this.setState({ data })
    }
    componentWillUnmount() {
        this.setState = () => false
    }
    
    render() {
        let { data } = this.state
        data = data.map(v => ({
            ...v,
            title: v.cat_name
        }))
        return (
            <div>
            { 
            this.props.location.pathname === "/category" && 
            <Fragment>
                 <NavBar
                    mode="dark"
                    onLeftClick={() => this.props.history.goBack()}
                    className="nav-bar-style"
                >商品分类</NavBar>

                <Tabs className="tabs"
                    tabs={data}
                    initalPage={0}
                    animated={false}
                    useOnPan={true}
                    tabBarTextStyle={
                        {
                            width: 86,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: '#666',
                            fontSize: 13
                        }
                    }
                    // 一页显示12个
                    renderTabBar={props => <Tabs.DefaultTabBar {...props} page={12} />}
                    靠左
                    tabBarPosition="left"
                    // 内容垂直
                    tabDirection="vertical"
                >
                    {
                        data.length ? data.map(v => (
                            v.children.map(value => (
                                value.children ? (
                                    <div key={value.cat_id} className={"cateItem"}>
                                        <div className={"cate_title"}>{value.cat_name}</div>
                                        <div className={"cate_content"}>
                                            {
                                                value.children.map(item => (
                                                    <div key={item.cat_id} onClick={() => this.props.history.push("/")}>
                                                        <img src={item.cat_icon} alt="" />
                                                        <span className={"cat_name"}>{item.cat_name}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ) : ""
                            ))
                        )) : ''
                    }
                </Tabs>
                <style jsx>{`
                        :global(.am-tabs-tab-bar-wrap) {
                            padding-bottom: 45px;
                        }

                        :global(.am-tabs-default-bar-left) {
                        padding-bottom: 51px;
                        background-color: #f7f7f7 !important;
                        }

                        :global(.am-tabs-pane-wrap) {
                        background-color: #fff;
                        padding-bottom: 52px;
                        }
                        :global(.am-tabs) {
                        position: fixed;
                        top: 45px;
                        }
                `}</style>
            </Fragment>
                
            }
            
            </div>
        )
    }
}

export default withRouter(Category)



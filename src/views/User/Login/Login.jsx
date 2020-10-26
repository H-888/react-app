import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { Icon, NavBar, InputItem, Button, WhiteSpace, Toast, Flex } from 'antd-mobile'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import userTypes from 'store/actionTypes/user'
import { submitLogin, getCartGoods } from 'api/index'

const mapStateToProps = state => ({ loginState: state.user.loginState })
const mapDispatchToProps = dispatch => ({
    changeLoginState: newState => dispatch({
        type: userTypes.CHANGE_LOGIN_STATE, payload: newState
    }),
    snycCartGoods: cart_Infos => (dispatch({
        type: userTypes.SYNC_CART_GOODS, payload: { cart_Infos }
    }))
})


@connect(mapStateToProps, mapDispatchToProps) class Login extends PureComponent {
    state = {
        username: "",
        password: ""
    }
    constructor(props) {
        super(props)
        if (!this.props.loginState && this.props.location.state && this.props.location.state.from.pathname !== "/login") {
            // console.log("getDerivedStateFromProps", props, state);
            //如果跳转之前的不是登录页面就跳转，跳转到登录页面提示请登录
            // 先判断是否有this.props.location.state, 有的话意味着从其他需求登录才
            // 能访问到页面跳转过来，否则就直接访问登录页面
            Toast.info("请登录", 1)
        }
    }
    // 点击登录
    handleLogin = () => {
        this.props.form.validateFields((error, value) => {
            // console.log("validateFields",error,value);
            if (error) {
                // 有错误，校验不通过
                Toast.fail("请检查数据是否填写正确", 1)
            } else {
                let obj = {
                    // 这里的号码格式是139 9999 9999 ，提交之前把中间的空格去掉
                    username: value.username.replace(/\s/g, ''),
                    password: value.password
                }
                submitLogin(obj).then(res => {
                    // 解构赋值
                    console.log(res);
                    const { meta: { status, msg }, message } = res
                    // 状态码为200的即登录成功
                    if (status === 200) {
                        // 登录成功将token设置在请求头中
                        let { token } = message
                        // 修改userReducer 中的状态
                        this.props.changeLoginState({ Login: true, token })
                        // 登录以后要同步购物车数据
                        getCartGoods().then(res => {
                            // 将数据解构处理
                            const { meta: { status }, message } = res
                            // 状态码200表示登陆后同步购物车中的状态
                            if (status === 200) {
                                // 判断购物车是否为空
                                if (message.cart_Info) {
                                    // 不为空的话同步购物车数据，修改CartReducer中购物车数量
                                    this.props.snycCartGoods(Object.values(JSON.parse(message.cart_Info)))
                                }
                            }
                        })

                        // 获取location中的form 
                        console.log(this.props);
                        const { from } = this.props.location.state || { from: { pathname: "/" } }
                        // 获取pathname
                        console.log(from);
                        let pathname = from.pathname
                        if (pathname === "/login") {
                            pathname = "/"
                        }
                        // 登录成功的弹框提示 1秒后消失
                        Toast.success(msg, 1, () => {
                            this.props.history.push(pathname)
                        })
                    } else {
                        // 否则提示错误信息
                        Toast.fail(msg, 1)
                    }
                })

            }
        })
    }
    render() {
        let { username, password } = this.state;
        const { getFieldError, getFieldProps } = this.props.form;
        return (
            <div>
                {
                    this.props.location.pathname === '/login' &&
                    <div>
                        <NavBar
                            mode={"dark"}
                            leftContent={<Icon type={"left"}></Icon>}
                            onLeftClick={() => { this.props.history.push("/user") }}
                        >登录</NavBar><WhiteSpace />
                        {/* 用户名 */}
                        <InputItem
                            //输入类型为手机号
                            clear type={"phone"}
                            placeholder="请输入手机号"
                            // 输入框尾部清空按钮
                            {...getFieldProps('username', {
                                // 输入框失焦时
                                validateTrigger: "onBlur",
                                // 验证规则
                                rules: [
                                    { required: true, message: "用户名不能为空" },
                                    { min: 11, message: "手机号必须为11位" },
                                ]
                            })}
                            // 验证不通过时设置error为true
                            error={getFieldError("username") ? true : false}
                            // 点击右侧的错误提示弹框
                            onErrorClick={() => {
                                Toast.info(getFieldError("username")[0], 2)
                            }}
                            // 将state中的值赋给输入框
                            value={username}
                            // 输入框输入改变时同步数据带state中的username
                            onChange={username => this.setState({ username })}
                        >用户名</InputItem><WhiteSpace />

                        {/* 密码 */}
                        <InputItem clear type={"passowrd"}
                            placeholder="请输入密码"
                            clear
                            {...getFieldProps('password', {
                                validateTrigger: 'onBlur',
                                rules: [
                                    {
                                        required: true, message: '密码不能为空',
                                    },
                                    {
                                        min: 6, message: "密码不能低于6位"
                                    }
                                ]
                            })}
                            error={getFieldError('password') ? true : false}
                            onErrorClick={() => {
                                Toast.fail(getFieldError('password')[0], 2)
                            }}
                            value={password}
                            onChange={password => this.setState({ password })}
                        >密 码</InputItem>
                        <WhiteSpace />
                        <Flex justify={"center"}>
                            {/* 登录 按钮 */}
                            <Button type="primary"
                                size={"small"}
                                onClick={this.handleLogin}
                                style={{ marginRight: 10 }}
                            >立即登录</Button>
                            <Button
                                type={"warning"}
                                size={"small"}
                                className={"bottom-button"}
                                onClick={() => this.props.history.push("/reg")}
                            >免费注册</Button>
                        </Flex>
                    </div>
                }
            </div>



        )
    }
}

export default (createForm()(withRouter(Login)))
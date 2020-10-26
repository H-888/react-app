import React, { useState } from 'react'
import { Button, Flex, Icon, InputItem, List, NavBar, Radio, Toast, WhiteSpace } from 'antd-mobile'
import { createForm } from 'rc-form';
import { withRouter } from 'react-router-dom'
import { submitReg, getVerigyCode } from "../../../api/index";
import "./Reg.scss"
  
export class Register extends React.Component<any,any> {
        state = {
            mobile: '',
            code: '',
            email: '',
            pwd: '',
            verifyPwd: '',
            gender: '男',
            codeText: '获取验证码'
        }
   
    // 点击单选框时触发
    onChange = (gender:any) => {
        this.setState({
            gender
        });
    };
    // 点击立即注册按钮
    handleRegister = () => {
        // validateFields方法用于js校验, error是错误对象,如果没有就是null
        this.props.form.validateFields((error:any, value:any) => {
            if (error) {
                // 有错误,校验不通过
                Toast.fail('请检查数据是否填写正确', 2)
            } else {
                let mobile = this.state.mobile.replace(/\s/g, '')
                submitReg({ ...this.state, mobile }).then((res:any) => {
                    const { meta: { status, msg } } = res
                    if (status === 200) {
                        // 提示注册成功
                        Toast.success(msg)
                        // 注册成功后返回登录页面
                        this.props.history.push('/login')
                    } else {
                        // 提示注册成功
                        Toast.success(msg)
                    }
                })
            }

        })
    }
    // 获取验证码
    getCode = (e:any) => {
        // 这里的号码格式是139 9999 9999 ，提交之前把中间的空格去掉
        var mobile = this.state.mobile.replace(/\s/g, '')
        // 判断手机号码是否符合要求
        if (!/^1[3-9]\d{9}$/.test(mobile)) {
            Toast.fail('手机号码格式有误', 2)
            return
        } else {
            // 设置倒计时
            let num = 30
            let timeId = setInterval(() => {
                this.setState({
                    codeText: `倒计时（${num--}）`
                })
                if (num === -1) {
                    clearInterval(timeId)
                    this.setState({
                        codeText: '获取验证码'
                    })
                }
            }, 1000);
            getVerigyCode(mobile).then(res => {
                // 将验证码赋值给输入框
                const { meta: { status }, message } = res
                if (status === 200) {
                    Toast.success(message, 3)
                }
            })
        }

    }

    render() {
        const { getFieldError, getFieldProps } = this.props.form
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.location.pathname === '/reg' ?
                    <NavBar
                        mode="dark"
                        leftContent={<Icon type='left' />}
                        onLeftClick={() => this.props.history.go(-1)}
                        className="nav-bar-style"
                    >
                        注册
                </NavBar> : ''
                }

                <List
                    style={{
                        marginTop: 45, position: 'relative'
                    }}
                >
                    <InputItem
                        // 输入类型为手机号码
                        type="phone"
                        placeholder="请输入手机号码"
                        // 输入框尾部清空按钮
                        clear
                        {...getFieldProps('mobile', {
                            // 输入框失焦时验证
                            validateTrigger: 'onBlur',
                            // 验证规则
                            rules: [
                                { required: true, message: "用户名不能为空" },
                                { min: 11, message: "手机号码必须为11位" },
                            ]
                        })
                        }
                        // 验证不通过时设置error为true
                        error={getFieldError('mobile') ? true : false}
                        // 点击右侧的错误弹出提示
                        onErrorClick={() => {
                            Toast.info(getFieldError('mobile')[0], 2)
                        }}
                        // 输入框输入改变时同步数据到state中的username
                        onChange={v => {
                            this.setState({
                                mobile: v
                            })
                        }}
                        // 将state中的username赋值给输入框
                        value={this.state.mobile}
                    >
                        <span className="star">*</span>  手机号码
                    </InputItem>
                    {/* 这里根据codeText来判断是否禁用button */}
                    <button disabled={this.state.codeText === '获取验证码' ? false : true} className="get-code" onClick={this.getCode}>{this.state.codeText}</button>
                    <InputItem
                        // 输入类型为数字
                        type="number"
                        placeholder="请输入验证码"
                        // 输入框尾部清空按钮
                        clear
                        {...getFieldProps('code', {
                            // 输入框失焦时验证
                            validateTrigger: 'onBlur',
                            // 验证规则
                            rules: [
                                { required: true, message: "验证码不能为空" },

                            ]
                        })
                        }
                        // 验证不通过时设置error为true
                        error={getFieldError('code') ? true : false}
                        // 点击右侧的错误弹出提示
                        onErrorClick={() => {
                            Toast.info(getFieldError('code')[0], 2)
                        }}
                        // 输入框输入改变时同步数据到state中的username
                        onChange={v => {
                            this.setState({
                                code: v
                            })
                        }}
                        // 将state中的username赋值给输入框
                        value={this.state.code}
                    >
                        <span className="star">*</span>
                        验证码
                    </InputItem>
                    <InputItem
                        // 输入类型为邮箱
                        type="email"
                        placeholder="请输入邮箱"
                        // 输入框尾部清空按钮
                        clear
                        {...getFieldProps('email', {
                            // 输入框失焦时验证
                            validateTrigger: 'onBlur',
                            // 验证规则
                            rules: [
                                { required: true, message: "邮箱不能为空" },
                                { type: 'email', message: '错误的 email 格式' }
                            ]
                        })
                        }
                        // 验证不通过时设置error为true
                        error={getFieldError('email') ? true : false}
                        // 点击右侧的错误弹出提示
                        onErrorClick={() => {
                            Toast.info(getFieldError('email')[0], 2)
                        }}
                        // 输入框输入改变时同步数据到state中的email
                        onChange={v => {
                            this.setState({
                                email: v
                            })
                        }}
                        // 将state中的email赋值给输入框
                        value={this.state.email}
                    >
                        <span className="star">*</span>  邮箱
                    </InputItem>
                    <InputItem
                        type="password"
                        placeholder="请输入密码"
                        clear
                        {...getFieldProps('pwd', {
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true, message: '密码不能为空'
                                },
                                {
                                    min: 6, message: '密码不能低于6位'
                                }
                            ]
                        })}
                        error={getFieldError('pwd') ? true : false}
                        onErrorClick={() => {
                            Toast.fail(getFieldError('pwd')[0], 2)
                        }}
                        onChange={v => {
                            this.setState({
                                pwd: v
                            })
                        }}
                        value={this.state.pwd}
                    >
                        <span className="star">*</span>  密码
                    </InputItem>
                    <InputItem
                        type="password"
                        placeholder="请输入确认密码"
                        clear
                        {...getFieldProps('verifyPwd', {
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true, message: '密码不能为空'
                                },
                                {
                                    min: 6, message: '密码不能低于6位'
                                }
                            ]
                        })}
                        error={getFieldError('verifyPwd') ? true : false}
                        onErrorClick={() => {
                            Toast.fail(getFieldError('verifyPwd')[0], 2)
                        }}
                        onChange={v => {
                            this.setState({
                                verifyPwd: v
                            })
                        }}
                        value={this.state.verifyPwd}
                    >
                        <span className="star">*</span>   确认密码
                    </InputItem>
                    <RadioItem key={1} checked={this.state.gender === '男'} onChange={() => this.onChange('男')}>
                        <span className="star">*</span>  男
                    </RadioItem>
                    <RadioItem key={2} checked={this.state.gender === '女'} onChange={() => this.onChange('女')}>
                        <span className="star">*</span>   女
                    </RadioItem>
                    <WhiteSpace />
                    <Flex justify="center">
                        {/* 注册按钮 */}
                        <Button type="primary" size="small" style={{ marginRight: 10, maxWidth: 120 }}
                            className="bottom-button"
                            onClick={this.handleRegister}>
                            立即注册
                            </Button>
                        {/* 取消注册按钮 */}
                        <Button type="warning" size="small" className="bottom-button" style={{ padding: '0 25px', maxWidth: 120 }}
                            onClick={() => this.props.history.push('/login')}>
                            取消
                            </Button>

                    </Flex>
                    <WhiteSpace />

                </List>

            </div>
        )
    }
}

export default createForm()(withRouter(Register) as any)



/***************************rc-form 不兼容hooks*****************************/
// const Reg:React.FC<any> = ({location, history, form }) => {
//     // Radio 单选框
//     // Radio.RadioItem#
//     // 基于List.Item对Radio进行封装,List.Item的extra属性固定传入Radio,其他属性和List.Item一致。 其他 API 和 Radio 相同。
//     const RadioItem = Radio.RadioItem

//     const [mobile, setMobile] = useState("")
//     const [code, setCode] = useState("")
//     const [email, setEmail] = useState("")
//     const [pwd, setPwd] = useState("")
//     const [verifyPwd, setVerifyPwd] = useState("")
//     const [gender, setGender] = useState("男")
//     const [conText, setContext] = useState("获取验证码")

//     const { getFieldError, getFieldProps } = form;
//     // 点击立即注册按钮
//     const  handleReg =  () => {
//         // validteFilds 方法用于js的校验 , error 是错误对象， 如果没有就是null
//         form.validateFieleds(async (error:any, value:any) => {
//             if(error){
//                 // 有错误，校验不通过
//                 Toast.fail('请检查数据是否填写正确',2)
//             }else{
//                 let newMobile = mobile.replace(/\s/g,"")
//                const res =  await submitReg({code,email,pwd,verifyPwd,gender,conText,newMobile})
//                const { meta: { status, msg }} = res
//                 if(status===200){
//                     // 提示注册成功
//                     Toast.success(msg)
//                     history.push("/login")
//                 }else{
//                     // 提示注册信息
//                     Toast.success(msg)
//                 }
//             }
//         }
//         )
//     }

//     // 获取验证码
//     const getCode = async (e:any) => {
//         // 这里的号码格式是 139 9999 9999 提交之前把中间的空格去掉
//         let newMobile = mobile.replace(/\s/g,'')
//         // 判断手机号是否符合要求
//         if(!/^1[3-9]\d{9}$/.test(mobile)){
//             Toast.fail('手机号格式有误',2)
//             return
//         }else{
//             // 设置倒计时
//             let num = 30
//             let timeId = setInterval(()=>{
//                 setContext(`倒计时（${num--}）`) 
//                 if(num === -1){
//                     clearInterval(timeId)
//                     setContext("获取验证码")
//                 }
//             },1000)
//           const  { meta: { status }, message }  = await getVerigyCode(mobile)
//             //将验证码赋值给输入框
//             if(status === 200){
//                 Toast.success(message,3)
//             }
          
//         }
//     }

//     return (
//         <div>
//             {
//                 location.pathname === '/reg' && (
//                     <NavBar
//                         mode={'dark'}
//                         leftContent={<Icon type={"left"}></Icon>}
//                         onLeftClick={() => (history.go(-1))}
//                     >
//                         注册
//                     </NavBar>
//                 )
//             }
//             <List
//                 style={{
//                     marginTop: 45, position: "relative"
//                 }}
//             >
//                 <InputItem
//                     // 输入类型为手机号
//                     type={"phone"}
//                     placeholder={"请输入手机号码"}
//                     // 输入框尾部的清除按钮
//                     clear
//                     {...getFieldProps('mobile', {
//                         // 输入框失焦时验证
//                         validateTrigger: "onBlur",
//                         // 验证规则
//                         rules: [
//                             { required: true, message: "用户名不能为空" },
//                             { min: 11, message: "手机号必须为11位" },
//                         ]
//                     })}
//                     // 验证不通过时设置error为true
//                     error={getFieldError('mobile') ? true : false}
//                     // 点击右侧的错误弹出提示
//                     onErrorClick={() => {
//                         Toast.info(getFieldError("mobile")[0], 2)
//                     }}
//                     // 输入框输入改变时同步数据到state中的username
//                     onChange={v => {
//                         setMobile(v)
//                     }}
//                     // 将state中的username赋值给输入框
//                     value={mobile}
//                 >
//                     <span className={"star"}>*</span>
//                    手机号码
//                 </InputItem>
//                 {/* 这里根据codeText来判断是否禁用button */}
//                 <button disabled={conText === "获取验证码" ? false : true} className={"get-code"} onClick={getCode}>{conText}</button>
//                 <InputItem
//                     // 输入类型为数字
//                     type={"number"}
//                     placeholder={"请输入验证码"}
//                     //输入框尾部清空按钮
//                     clear
//                     {...getFieldProps("code", {
//                         // 输入框失焦的时候验证
//                         validateTrigger: "onBlur",
//                         // 验证规则
//                         rules: [
//                             { required: true, message: "验证码不能为空" },
//                         ]
//                     })}
//                     // 验证不通过时设置error为true
//                     error={getFieldError("code") ? true : false}
//                     // 点击右侧的错误弹框提示
//                     onErrorClick={() => {
//                         Toast.info(getFieldError("code")[0], 2)
//                     }}
//                     //输入框输入改变时同步数据到state中的username
//                     onChange={v => {
//                         setCode(v)
//                     }}
//                     //将state中的username赋值给输入框
//                     value={code}
//                 >
//                     <span className={'star'}>*</span>验证码
//                 </InputItem>
//                 <InputItem
//                     // 输入类型为邮箱
//                     type="email"
//                     placeholder="请输入邮箱"
//                     // 输入框尾部清空按钮
//                     clear
//                     {...getFieldProps('email', {
//                         // 输入框失焦时验证
//                         validateTrigger: 'onBlur',
//                         // 验证规则
//                         rules: [
//                             { required: true, message: "邮箱不能为空" },
//                             { type: 'email', message: '错误的 email 格式' }
//                         ]
//                     })
//                     }
//                     // 验证不通过时设置error为true
//                     error={getFieldError('email') ? true : false}
//                     // 点击右侧的错误弹出提示
//                     onErrorClick={() => {
//                         Toast.info(getFieldError('email')[0], 2)
//                     }}
//                     // 输入框输入改变时同步数据到state中的eamil
//                     onChange={v => {
//                         setEmail(v)
//                     }}
//                     // 将state中的email赋值给输入框
//                     value={email}
//                 >
//                 </InputItem>
//                 <InputItem
//                     type="password"
//                     placeholder="请输入确认密码"
//                     clear
//                     {...getFieldProps('pwd', {
//                         validateTrigger: 'onBlur',
//                         rules: [
//                             {
//                                 required: true, message: '密码不能为空'
//                             },
//                             {
//                                 min: 6, message: '密码不能低于6位'
//                             }
//                         ]
//                     })}
//                     error={getFieldError('pwd') ? true : false}
//                     onErrorClick={() => {
//                         Toast.fail(getFieldError('pwd')[0], 2)
//                     }}
//                     onChange={v => {
//                         setPwd(v)
//                     }}
//                     value={pwd}
//                 >
//                     <span className="star">*</span>密码
//                     </InputItem>
//                 <InputItem
//                     type="password"
//                     placeholder="请输入确认密码"
//                     clear
//                     {...getFieldProps('verifyPwd', {
//                         validateTrigger: 'onBlur',
//                         rules: [
//                             {
//                                 required: true, message: '密码不能为空'
//                             },
//                             {
//                                 min: 6, message: '密码不能低于6位'
//                             }
//                         ]
//                     })}
//                     error={getFieldError('verifyPwd') ? true : false}
//                     onErrorClick={() => {
//                         Toast.fail(getFieldError('verifyPwd')[0], 2)
//                     }}
//                     onChange={v => {
//                         setVerifyPwd(v)
//                     }}
//                     value={verifyPwd}
//                 >
//                     <span className="star">*</span>确认密码
//                     </InputItem>
//                 <RadioItem
//                     key={1}
//                     checked={gender === "男"}
//                     onChange={() => {
//                         setGender("男")
//                     }}
//                 >
//                     <span className={'star'}>*</span>男
//                 </RadioItem>
//                 <RadioItem
//                     key={2}
//                     checked={gender === "女"}
//                     onChange={() => {
//                         setGender("女")
//                     }}
//                 >
//                     <span className={'star'}>*</span>女
//                 </RadioItem>
//                 <WhiteSpace />
//                 <Flex justify={'center'}>
//                     {/* 注册按钮 */}
//                     <Button type={'primary'} size={"small"}
//                         style={{ marginRight: 10, maxWidth: 120 }}
//                         className={"bottom-button"}
//                         onClick={handleReg}
//                     >立即注册</Button>
//                     {/* 取消注册按钮 */}
//                     <Button
//                         type={"warning"}
//                         size={"small"}
//                         className={'bottom-button'}
//                         style={{ padding: '0 25px', maxWidth: 120 }}
//                         onClick={history.push("/login")}
//                     >
//                         取消
//                     </Button>
//                 </Flex>
//                 <WhiteSpace />
//             </List>
//         </div>
//     )
// }



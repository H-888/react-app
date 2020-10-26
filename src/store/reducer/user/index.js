import user from '../../state/user'
import userTypes from '../../actionTypes/user'
import qs from 'qs'
export default (state = user, { type, payload }) => {
       state = JSON.parse(JSON.stringify(state))
       switch (type) {
              // 如果改变了登录状态
              case userTypes.CHANGE_LOGIN_STATE:
                     // 登录成功则将token存入会话存储
                     if (payload.Login) {
                            sessionStorage.setItem("user", qs.stringify(payload))
                     }
                     // console.log({ ...state, loginState: payload.Login});
                     return { ...state, loginState: payload.Login ,token:payload.token}
              // 保存地址信息
              case userTypes.SAVE_ADDRESS_INFO:
                     return { ...state, ...payload }
              //退出账号
              case userTypes.LOGINOUT:
                     sessionStorage.removeItem("user")
                     return { ...state, loginState: false }
              default:
                     return { ...state, loginState: sessionStorage.getItem("user") ? true : false }
       }
}
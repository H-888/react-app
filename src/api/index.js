import request from 'umi-request'
// 设置公共前缀
export const baseUrl = 'https://api-hmugo-web.itheima.net';
const url = 'https://api-hmugo-web.itheima.net/api/public/v1'
//获取首页商品列表的数据
export const getHomeGoodsList = () => request.get(url+"/home/goodslist")
//搜索商品查询
export const searchGoods = value => request.get(url+"/goods/search?" + value)
//搜索建议查询
export const searchSuggest = value => request.get(url+"/goods/search?query=" + value)
// 获取商品详情
export const getGoodsDetail = id => request.get(url+'/goods/detail?goods_id=' + id)
// 获取分类信息
export const getCategory = () => request.get(url+"/categories")
//登录账号
export const submitLogin = ({username,password}) => request.post(url+"/login",{data:{username,password}})
//注册账号
export const submitReg = regObj => request.post(url+"/users/reg",{data:{...regObj}})
// 获取验证码
export const getVerigyCode = mobile => request.post(url+"/users/get_reg_code", {data:{mobile}})
//获取购物车数据
export const getCartGoods = () => request.get(url+"/my/cart/all")
// 添加购物车
export const addCart = info => request.post(url+"/my/cart/add", {data:{info}})
// 同步购物车
export const syncCart = infos => request.post(url+"/my/cart/sync", infos)
// 创建订单
export const createOrder = goodsInfo => request.post(url+"/my/cart/create",goodsInfo)
// 获取订单
export const getOrder = () => request.get(url+"/my/orders/all")
//获取用户信息
export const getUserInfo = () => request.get(url+"/my/users/userinfo")
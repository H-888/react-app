import cartTypes from '../../actionTypes/cart'
import cart from '../../state/cart'

export default (state = cart, { type, payload }) => {
    switch (type) {
        // 同步购物车数据
        case cartTypes.SYNC_CART_GOODS:
            let { cart_Infos } = payload;
            let totaNum = 0;
            // 通过循环遍历取出购物车商品的总量
            for (let goods_id in cart_Infos) {
                totaNum += cart_Infos[goods_id].amount
            }
            // 返回新数据
            return { ...state, totaNum, ...payload }
        case cartTypes.ADD_CART:
            state.totalNum += 1
            return { ...state }
        // 点击结算时保存购物车数据
        case cartTypes.BUY_NOW:
            return { ...state, ...payload }
        case cartTypes.CLEAR:
            return {}
        default:
            return state
    }
}
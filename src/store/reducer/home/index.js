import home from '../../state/home'
import homeTypes from '../../actionTypes/home'
export default (state=home,{type,payload})=>{
    if(type === homeTypes.CHANGE_GOODS_LIST){
        state.goodsList = payload ? payload : []
    } 
    return state;
}
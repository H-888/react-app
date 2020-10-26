import homeTypes from '../../actionTypes/home'
import {getHomeGoodsList} from 'api/index'
export const changeGoodsList = (payload) => {
    return {
        type:homeTypes.CHANGE_GOODS_LIST,
        payload
    }
}

export default {
    getGoodsList(){
        return async (dispath)=>{
            const data = await getHomeGoodsList()
            dispath(changeGoodsList(data.message))
        }
    },

}

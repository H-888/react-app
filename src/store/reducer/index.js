import { combineReducers } from 'redux'

import home from './home'
import user from './user'
import cart from './cart'
export default combineReducers({
    home,user,cart
})
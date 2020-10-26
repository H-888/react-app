import userTypes from '../../actionTypes/user'

export const changLoginSatate = (payload) =>
{
       return {
        type:userTypes.CHANGE_LOGIN_STATE,
        payload
       }
}

import * as userServices from "../services/user.service";
import * as actionTypes from "./types";

export function verifyUser(identityCard) {
    return async (dispatch, getState) => {
        const { auth: { user } } = getState();
        const { isVerified } = user;    
        if (!isVerified) {
            try {
                await userServices.verify(identityCard);
                dispatch({ type: actionTypes.UPDATE_USER_INFO, payload: {...user, isRequestVerify: true} });
            } catch(err) {
                window.alert("Verify failed" + err);
            }
        }
    }
}

export function uploadAvatar(avatar) {
    return async (dispatch, getState) => {
        const {auth:{user:{username}}} = getState()
        const {data: avatarURL} = await userServices.uploadAvatar(username, avatar)
        dispatch({type: actionTypes.UPLOAD_AVATAR, payload: avatarURL});
    }
}
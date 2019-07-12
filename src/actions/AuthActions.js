import request from '../services/request'
import {setToken, getToken} from '../utils/storage'
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  CATEGORY_CHANGED
} from './types';

export const usernameChanged = (text) => {
  return {
    type: USERNAME_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    return request({
      url: `accounts/login`,
      method: 'post',
      data: { username: username, 
          password: password }
    }).then(async res => {
      await setToken(res.data.token)
      loginUserSuccess(dispatch, res.data.user)

    }).catch(error => {
      console.log(error)
      loginUserFail(dispatch)
    })   
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};

export function logOutUser() {
  AsyncStorage.clear();
  return { type: LOGOUT_USER };
}

export const categoryChanged = (number) => {
  return {
    type: CATEGORY_CHANGED,
    payload: number
  };
};
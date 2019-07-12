import {AsyncStorage} from 'react-native'

export function getToken() {
  return AsyncStorage.getItem('token')
}

export function setToken(token) {
  AsyncStorage.setItem("token", token);
}
import Axios from "axios";
import request from './request'
import {AsyncStorage} from 'react-native';

export function getAllUsers(q) {
  if(q){
    return request({
      url: `/accounts/?q=`+q,
      method: 'get',
    })
  }
  return request({
    url: `/accounts/`,
    method: 'get',
  })
}

export function getAllOrgs() {
  return request({
    url: `/orgs/`,
    method: 'get',
  })
}
export function getAllUsersRank() {
  return request({
    url: `/ranking`,
    method: 'get',
   
  })
}


const instance = Axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  headers: { "x-access-token": AsyncStorage.getItem("token") }
});




export function verify(identityCard) {
    let formData = new FormData()
    for (let i = 0; i < identityCard.length; i++){
      formData.append("verify", identityCard[i]);
    }
    return Axios.post("/accounts/verify", formData, { headers: { "x-access-token": AsyncStorage.getItem("token") } });
}

export function uploadAvatar(username, avatar) {
  const formData = new FormData()
  formData.append("avatar", avatar)
  return Axios.put(`/accounts/u/${username}/avatar`, formData, {headers: {"x-access-token": AsyncStorage.getItem("token")}})
}

import axios from 'axios'
import {getToken} from '../utils/storage'
import AsyncStorage from 'react-native';

const service = axios.create({
  baseURL: 'http://172.105.113.23:3000/',
  timeout: 5000 
})

service.interceptors.request.use(
  async config => {
    config.headers['x-access-token'] =  await getToken()
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
      return response
    
  },
  error => {
    // let message = error.response.data[Object.keys(error.response.data)[0]]
    // if (typeof (message) === 'object') {
    //   message = message[0]
    // }
    // Message({
    //   message: JSON.stringify(error.response),
    //   type: 'error',
    //   duration: 5 * 1000  
    // })
    return Promise.reject(error)
  }
)

export default service
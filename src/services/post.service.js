import Axios from 'axios';
import request from './request';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
export function createPost(post) {
    return request({
        url: `posts`,
        method: 'post',
        data: post
    })
}

export function deletePost(id) {
    return request({
      url: `/posts/`+id,
      method: 'delete',
    }).then(response => { 
      Alert.alert("Xóa thành công")
    })
    .catch(error => {
      Alert.alert("Xóa thất bại")
    });
  }
export function updateImage(id, image) {
    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("resources", {
        uri: image[i].uri,
        type: image[i].type,
        name: image[i].fileName
      });
    }
    return request({
        url: `posts/${id}/resources`,
        method: 'put',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}
export function getUserPosts(username) {
    return request({
        url: `accounts/u/` + username +`/posts`,
        method: 'get'
    })
}

export function reportPost(data) {
    return request({
        url: `reports`,
        method: 'post',
        data: data
    }).then(response => { 
      Alert.alert("Báo cáo bài viết thành công")
      })
      .catch(error => {
        Alert.alert("Báo cáo bài viết thất bại")
      });
}


export function getPosts(type) {
    if (type === 0) {
        return request({
            url:`posts`,
            method: 'get'
        })
        //return Axios.get('/posts', { headers: { "x-access-token": localStorage.getItem("token") } });
    } else {
        // return request({
        //     url:`/posts?type=${type}`,
        //     method: 'get'
        // })
        //return Axios.get(`/posts?type=${type}`, { headers: { "x-access-token": localStorage.getItem("token") } });
    }
}
// export function createPost(post) {
//     return Axios.post('/posts', post, { headers: { "x-access-token": localStorage.getItem("token") } })
//         .then(({ data: { id } }) => {
//             if (post.image) {
//                 const formData = new FormData();
//                 for (let i = 0; i < post.image.length; i++) {
//                     formData.append('resources', post.image[i]);
//                 }
//                 return Axios.put(`/posts/${id}/resources`, formData, { headers: { "x-access-token": localStorage.getItem("token") } })
//             } else {
//                 return Promise.resolve();
//             }
//         });
// }



export function getSpecificPost(postId) {
    return request({
        url: `posts/${postId}`,
        method: 'get',
        
    })
}

export function getSpecificEvents(postId) {
    return request({
        url: `events/${postId}`,
        method: 'get',
        
    })
}
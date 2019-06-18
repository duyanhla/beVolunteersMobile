import request from './request'

export function getNewfeed(page) {
    if(page==0){
        return request({
            url:`/newsfeed`,
            method: 'get'
        })
    }

    else{
        return request({
            url:`/newsfeed?page=`+ page,
            method: 'get'
        })
    }
       
       
}
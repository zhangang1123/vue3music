import request from './base';
export function getBanners(){
    return request({
        url: '/banner',
        method: 'GET',
    })
}
export function dailyRecommand(limit=10,order='hot'){
    return request({
        url:'/top/playlist',
        method:'GET',
        params:{
            order,
            limit,
        }
    })
}
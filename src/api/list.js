import request  from "./base";
export function getListDetail(id){
    return request({
        url:'/playlist/detail',
        method: 'GET',
        params: {
            id,
            timestamp:Date.now(),
        }
    })
}
export function getAllList(){
    return request({
        url:'/toplist',
        method: 'GET',
    })
}
export function getSingerList(type=-1,area=-1,initial=-1){
    return request({
        url:'artist/list',
        method: 'GET',
        params: {
            limit:30,
            offset:0,
            type,
            area,
            initial,
        }
    })
}
export function getNewSong(type=0){
    return request({
        url:'/top/song',
        method: 'GET',
        params: {
            type,
        }
    })
}
export function getNewalbum(limit,offset=0){
    return request({
        url:'/top/album',
        method: 'GET',
        params: {
            limit,
            offset,
        }
    })
}
export function getComments(id,limit,offset){
    return request({
        url:'/comment/playlist',
        method: 'GET',
        params: {id,
            limit,
            offset,
            timestamp:Date.now(),
        }
    })
}
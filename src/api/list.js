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
export function recommendSongs(){
    return request({
        url:'/recommend/songs',
        method: 'GET',
    })
}
export function searchHot(){
    return request({
        url:'/search/hot/detail',
        method: 'GET',
    })
}
export function getSearchList( keywords,type,offset=0,limit=30){
    return request({
        url:'/cloudsearch',
        method: 'GET',
        params: {
            limit,
            offset,
            type,
            keywords,
        }
    })
}
export function getMusicComment(id,limit=20,offset=0){
    return request({
        url:'/comment/music',
        method: 'GET',
        params: {
            id,
            limit,
            offset,
            timestamp:Date.now(),
        }
    })
}
//获取歌词
export function getlyric(id){
    return request({
        url:'/lyric',
        method: 'GET',
        params: {
            id,
        }
    })
}
//获取私人FM
export function getPersonal(){
    return request({
        url:'/personal_fm',
        method: 'GET',
        params: {
            timestamp:Date.now(),
        }
    })
}
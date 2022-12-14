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
export function getNewSong(type=0,limit=20){
    return request({
        url:'/top/song',
        method: 'GET',
        params: {
            type,
            limit,
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
//喜欢的音乐列表
export function getLikeList(uid){
    return request({
        url:'/likelist',
        method: 'GET',
        params: {
            uid,
        }
    })
}
//获取用户歌单
export function getUserList(uid){
    return request({
        url:'/user/playlist',
        method: 'GET',
        params: {
            uid,
        }
    })
}
//获取歌手信息
export function getSingerIntro(id){
    return request({
        url:'/artist/desc',
        method: 'GET',
        params: {
            id,
        }
    })
}
//获取歌手专辑
export function getSingerAlbum(id,limit){
    return request({
        url:'/artist/album',
        method: 'GET',
        params: {
            id,
            limit,
        }
    })
}
//获取歌手top50的歌
export function getTop(id){
    return request({
        url: '/artist/top/song',
        method: 'GET',
        params: {
            id
        }
    })
}
//获取相似歌手
export function getSimiSinger(id){
    return request({
        url:'/simi/artist',
        method: 'GET',
        params: {
            id
        }
    })
}
//获取专辑详情
export function albumDetail(id){
    return request({
        url:'/album',
        method: 'GET',
        params: {
            id,
        }
    })
}
export function albumInfoSize(id){
    return request({
        url:'/album/detail/dynamic',
        method: 'GET',
        params: {
            id,
        }
    })
}
//获取专辑评论
export function getALbumComment(id,limit,offset=0){
    return request({
        url:'/comment/album',
        method: 'GET',
        params: {
            id,
            limit,
            offset,
        }
    })
}
export function getCollectAlbum(limit=25){
    return request({
        url:'/album/sublist',
        method: 'GET',
        params: {
            limit,
        }
    })
}
export function getCollectArtist(limit=25){
    return request({
        url:'/artist/sublist',
        method: 'GET',
        params: {
            limit,
        }
    })
}
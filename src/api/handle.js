import request  from "./base";
export function deletefromFM(id) {
    return request({
        url:'/fm_trash',
        method:'POST',
        data:{
            id,
        }
    })
}
export function addComment(t,type,id,content,commentId){
    return request({
        url:'/comment',
        method:'POST',
        data:{
            t,
            type,
            id,
            content,
            commentId
        }
    })
}
export function likeComment(id,cid,t,type){
    return request({
        url:'/comment/like',
        method:'POST',
        data:{
            id,
            cid,
            t,
            type,
        }
    })
}
export function likeSong(id,like){
    return request({
        url:'/like',
        method:'GET',
        params:{
            id,
            like,
            timestamp:Date.now(),
        }
    })
}
export function collectSongList(t,id){
    return request({
        url:'/playlist/subscribe',
        method: 'POST',
        data:{
            t,
            id,
        }
    })
}
export function collectAlbum(id,t){
    return request({
        url:'/album/sub',
        method: 'POST',
        data:{
            id,
            t,
            timestamp:Date.now(),
        }
    })
}

export function updateInfo(gender,signature,nickname,birthday) {
    return request({
        url:'/user/update',
        method: 'GET',
        params: {
            gender,
            signature,
            nickname,
            birthday,
            timestamp:Date.now(),
        }
    })
}
export function updateAvatar(data){
    return request({
        url:`/avatar/upload?timestamp${Date.now()}`,
        method: 'POST',
        data,
        headers:{
            'Content-Type': 'multipart/form-data',
        }
    })
}
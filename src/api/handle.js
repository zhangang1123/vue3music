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
        method:'POST',
        data:{
            id,
            like,
        }
    })
}
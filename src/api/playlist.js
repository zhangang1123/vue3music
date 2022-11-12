import request  from "./base";
export function playlistDetail(id) {
    return request({
        url:'/playlist/detail',
        method: 'GET',
        params: {
            id,
            timestamp:Date.now(),
        }
    })
}
export function getSongDetails(id) {
    return request({
        url:'/song/detail',
        method: 'GET',
        params: {
            ids:id,
        }
    })
}
export function getSongUrl(id) {
    return request({
        url:'/song/url',
        method: 'GET',
        params: {
            id,
        }
    })
}
export function getAllTags() {
    return request({
        url:'/playlist/catlist',
        method: 'GET',
    })
}
export function getPlaylist(limit=40,order='hot',cat='华语',offset=0) {
    return request({
        url:'/top/playlist',
        method: 'GET',
        params: {
            limit,
            order,
            cat,
            offset,
        }
    })
}
export function getHighQuality(limit=1,cat='华语') {
    return request({
        url:'/top/playlist/highquality',
        method: 'GET',
        params: {
            limit,
            cat,
        }
    })
}

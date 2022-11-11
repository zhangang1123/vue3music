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

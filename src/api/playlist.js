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

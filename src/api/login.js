import request  from "./base";
export function loginByPhone(data) {
    return request({
        url:'/login/cellphone',
        method: 'POST',
        data,
    })
}
export function getQrKey(timestamp){
    return request({
        url:'/login/qr/key',
        method: 'GET',
        params: {
            timestamp,
        }
    })
}
export function getQrImg(key,qrimg=true){
    return request({
        url:'/login/qr/create',
        method: 'GET',
        params: {
            key,
            qrimg,
            timestamp:Date.now(),
        }
    })
}
export function checkQr(key){
    return request({
        url:'/login/qr/check',
        method: 'GET',
        params: {
            key,
            timestamp:Date.now(),
        }
    })
}
export function logOut(){
    return request({
        url:'/logout',
        method: 'GET',
        params: {
            timestamp:Date.now(),
        }
    })
}
export function loginStatus(){
    return request({
        url:'/login/status',
        method: 'GET',
        params: {
            timestamp:Date.now(),
        }
    })
}
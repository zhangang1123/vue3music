<template>
  <div class="form-qr">
    <div class="qr-title">打开
        <a href="https://music.163.com/#/download" target="_blank" style="text-decoration: none; color: blue;">网易云音乐手机端</a>扫码登陆</div>
    </div>
    <div class="QRcode">
        <img :src="imgData" alt="扫码登陆">
    </div>
    <div class="qr-title">状态：{{status}}</div>
</template>

<script setup>
import { getQrKey, getQrImg, checkQr } from "../../api/login";
import { ref, onBeforeUnmount,} from 'vue';
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
let key;
let imgData=ref('');
let status=ref('');
let time;
let userInfo;
const store=useStore();
const router=useRouter();
async function getKey(){
    const res = await getQrKey(Date.now());
    if(res.data.data.code==200)
    {
        key = res.data.data.unikey
        getImgData(key);
        checkQrcode(key);
    }
}
async function getImgData(key){
    const res=await getQrImg(key);
    if (res.data.code == 200)
    {
        imgData.value = res.data.data.qrimg
        time = setInterval(() => {
            checkQrcode(key);
        }, 1000);
    }
}
async function checkQrcode(key){
    const res= await checkQr(key);
    console.log(res.data);
    if(res.data.code==800)
    {
        status.value=res.data.message;
    }
    else if (res.data.code == 801) {
        status.value = res.data.message;
    } 
    else if (res.data.code == 802) {
        status.value = res.data.message;
        console.log(res.data);
        userInfo = { nickname: res.data.nickname, avatar: res.data.avatarUrl }
    }
    else if (res.data.code == 803) {
        status.value = res.data.message;
        store.commit('changeState',userInfo);
        router.replace({ name: 'center' });
    }
}
getKey()
onBeforeUnmount(()=>{
    clearInterval(time);
})
</script>

<style scoped>
.qr-title{
    text-align: center;
    margin: 20px 0;
    font-size: 14px;
    color: #2c3e50;
}
.QRcode{
    width: 200px;
    height: 200px;
    padding:0px 95px;
    box-sizing: content-box;
}
.QRcode img{
    width: 100%;
    height: 100%;
}
</style>
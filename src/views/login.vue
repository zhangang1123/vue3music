<template>
<div class="login">
    <div class="login-container" :style="{ backgroundImage: 'url(' + picUrl + ')' }">
    <div class="window">
        <div class="title">
            {{title[loginBy]}}登录
        </div>
        <div class="tabs">
            <div :class="{active:loginBy=='phone'}" @click="loginBy ='phone'">手机号</div>
            <div :class="{active:loginBy=='QRcode'}" @click="loginBy='QRcode'">二维码</div>
            <div :class="{active:loginBy=='authCode'}" @click="loginBy ='authCode'">验证码</div>
        </div>
        <component :is="loginForm[loginBy]"/>
    </div>
    </div>
</div>
</template>

<script setup>
import {ref} from 'vue'
import loginBynumber from '../components/login/loginBynumber.vue'
import loginByQRcode from '../components/login/loginByQRcode.vue'
import loginByAuthCode from '../components/login/loginByAuthCode.vue'
let picUrl =require('../assets/img/login.jpg');
let loginBy=ref('phone');
const loginForm = { phone: loginBynumber, QRcode: loginByQRcode, authCode: loginByAuthCode };
const title = { phone: '手机号', QRcode: '二维码', authCode: '验证码' };
</script>

<style scoped>
.tabs{
    display: flex;
    justify-content: center;
}
.tabs div{
    font-size: 16px;
    padding:1px 6px;
    cursor: pointer;
    color: #676767;
}
.tabs div:hover{
    color: #000;
}
.active{
    font-weight: bold;
    border-bottom: 4px solid #000;
}
.login {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
}
.title {
    display: block;
    font-size: 30px;
    color: #423d3d;
    line-height: 1.2;
    text-align: center;
    padding-bottom: 49px;
}
.login .login-container {
    min-height: 100vh;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
}
.window{
    width: 390px;
    height:481px;
    box-sizing: content-box;
    border-radius: 10px;
    background-color: #fff;
    padding: 65px 55px 54px 55px;
}
</style>
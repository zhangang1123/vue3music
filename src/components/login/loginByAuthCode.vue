<template>
<div class="form-auth">
    <el-form label-position="top" label-width="80px">
        <el-form-item label="手机号">
            <el-input class="w-50 m-2" size="large" placeholder="请输入手机号" :prefix-icon="Iphone" />
        </el-form-item>
        <el-form-item label="验证码">
            <el-input show-password type="password" class="w-30 m-2 Auth" size="large" placeholder="请输入验证码"
                :prefix-icon="Key" />
            <el-button size="large" style="margin-left:16.25px">获取验证码</el-button>
        </el-form-item>
        <el-button class="toLogin">登录</el-button>
    </el-form>
</div>
</template>

<script setup>
import { Iphone, Key } from '@element-plus/icons-vue'

</script>

<style scoped>
.Auth{
    width: 260px !important;
}
.toLogin {
    margin-top: 20px;
    width: 350px;
    height: 50px;
    padding: 0px 20px;
    box-sizing: content-box;
    color: #fff;
    border-radius: 30px !important;
    background-image: url('../../assets/img/login.jpg');
    transition: all 0.5s;
}

.toLogin:hover {
    background-position-x: 25%;
}

.form-number {
    text-align: center;
}
</style>
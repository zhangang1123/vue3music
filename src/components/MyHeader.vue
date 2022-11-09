<template>
<div class="header-bar">
    <div class="logo-wrap pointer" >
        <i class="iconfont icon-logView"></i>
    </div>
    <div class="btn-history">
        <button class="btn-circle">
            <i class="iconfont icon-arrow-left-bold"></i>
        </button>
        <button class="btn-circle">
            <i class="iconfont icon-arrow-right"></i>
        </button>
    </div>
    <div class="search-box">
        <el-input v-model="input" 
        @blur="isblur=false"
        @focus="isblur=true"
        class="w-50 m-2" placeholder="输入你喜欢的音乐" :suffix-icon="Search" />
        <suggestion v-show="isblur"/>
    </div>
    <div 
    @click="goLogin()"
    class="avatar-wrap mleft-12 pointer div-type" >
                <el-avatar :icon="UserFilled" :size="30"/>
    </div>
    <div class="login-info mleft-10 font-12 text-hidden pointer" >
        未登录
    </div>
</div>
</template>

<script setup>
import suggestion from "./suggestion.vue"
import { Search } from '@element-plus/icons-vue'
import { UserFilled } from '@element-plus/icons-vue'
import {ref} from 'vue';
import { useRouter, useRoute } from 'vue-router'
let isblur=ref(false)
let input=ref('');
let router=useRouter();
function goLogin()
{
    router.push({name: 'login'});
}
</script>

<style scoped>

.search-box{
    position: relative;
}

.header-bar {
    height: 100%;
    display: flex;
    align-items: center;
    color: #ffffff;
    background-color: #dd3534;
}

.logo-wrap {
    height: 60px;
    line-height: 60px;
}

.logo-wrap .icon-logView {
    font-size: 48px;
}

.menu-btn {
    display: none;
}

.btn-history {
    margin-left: 100px;
    display: flex;
}

/* 圆按钮 */
.btn-history .btn-circle {
    display: flex;
    height: 26px;
    width: 26px;
    outline: 0;
    border: 0;
    background-color: #e13e3e;
    color: #ffffff;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
}

/* 搜索框容器 */
</style>
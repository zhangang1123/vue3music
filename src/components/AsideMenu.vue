<template>
<el-menu default-active="1" active-text-color="red">
    <el-menu-item index="1">
        发现音乐
    </el-menu-item>
    <el-menu-item index="2" :disabled="!store.state.isLogin">
        视频
    </el-menu-item>
    <el-menu-item index="3" :disabled="!store.state.isLogin">
        私人FM
    </el-menu-item>
    <el-menu-item index="4" :disabled="!store.state.isLogin">
        每日推荐
    </el-menu-item>
    <el-menu-item index="5">
        最近播放
    </el-menu-item>
    <el-menu-item index="6" :disabled="!store.state.isLogin">
        我的收藏
    </el-menu-item>
</el-menu>
</template>

<script setup>
import { useStore } from 'vuex';
let store = useStore();
</script>

<style scoped>
.el-menu-item.is-active {
    color: #313131 !important;
    background-color: #f6f6f7 !important;
    font-weight: bold !important;
    font-size: 15px !important;
}
</style>
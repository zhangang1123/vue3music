<template>
<el-menu :default-active="defaultLight" router>
    <el-menu-item index="discoverMusic" :route="{ name:'discoverMusic'}">
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
    <el-menu-item index="recentlyPlay" :route="{ name:'recentlyPlay'}">
        最近播放
    </el-menu-item>
    <el-menu-item index="6" :disabled="!store.state.isLogin">
        我的收藏
    </el-menu-item>
</el-menu>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import {  computed } from 'vue';
let store = useStore();
let route = useRoute();
let defaultLight=computed(()=>{
    if (route.name == 'recommandBySelf' || route.name == 'songList')
    {
        return 'discoverMusic';
    }else{
        return route.name;
    }
});
</script>

<style scoped>
.el-menu-item.is-active {
    color: #313131 !important;
    background-color: #f6f6f7 !important;
    font-weight: bold !important;
    font-size: 15px !important;
}
</style>
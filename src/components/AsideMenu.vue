<template>
<el-menu :default-active="defaultLight" >
    <el-menu-item index="discoverMusic" @click="changeRoute('discoverMusic')">
        发现音乐
    </el-menu-item>
    <el-menu-item index="2" :disabled="!store.state.isLogin">
        视频
    </el-menu-item>
    <el-menu-item index="personalFM" :disabled="!store.state.isLogin" @click="toPersonal()">
        私人FM
    </el-menu-item>
    <el-menu-item-group title="我的音乐">
        <el-menu-item index="dailyRecommend" :disabled="!store.state.isLogin" @click="changeRoute('dailyRecommend')">
            每日推荐
        </el-menu-item>
        <el-menu-item index="recentlyPlay" @click="changeRoute('recentlyPlay')">
            最近播放
        </el-menu-item>
        <el-menu-item index="6" :disabled="!store.state.isLogin">
            我的收藏
        </el-menu-item>
    </el-menu-item-group>
</el-menu>
</template>

<script setup>
import { getPersonal } from '../api/list'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import {  computed } from 'vue';
let store = useStore();
let route = useRoute();
let router = useRouter();
let defaultLight=computed(()=>{
    if (route.name == 'recommandBySelf' || route.name == 'songList')
    {
        return 'discoverMusic';
    }else{
        return route.name;
    }
});
function changeRoute(to)
{
    if(route.name == to)
        return;
    router.push({name:to});
}
async function toPersonal(){
    if (route.name == 'personalFM')
        return;
    const res = await getPersonal();
    let Info = { duration: res.data.data[0].duration, id: res.data.data[0].id,picUrl: res.data.data[0].album.blurPicUrl, name: res.data.data[0].name, album: { name: res.data.data[0].album.name, id: res.data.data[0].album.id }, author: { id: res.data.data[0].artists[0].id,name: res.data.data[0].artists[0].name } }
    router.replace({ name: 'personalFM', query: { songInfo:JSON.stringify(Info)}});
}
</script>

<style scoped>
.el-menu-item.is-active {
    color: #313131 !important;
    background-color: #f6f6f7 !important;
    font-weight: bold !important;
    font-size: 15px !important;
}
</style>
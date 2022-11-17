<template>
<el-menu :default-active="route.name" style="overflow: hidden">
    <el-menu-item index="recommandBySelf" @click="changeRoute('discoverMusic')">
        发现音乐
    </el-menu-item>
    <el-menu-item index="shipin" :disabled="!store.state.isLogin">
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
        <el-menu-item index="myCollect" :disabled="!store.state.isLogin" @click="changeRoute('myCollect')">
            我的收藏
        </el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="我的歌单" v-if="store.state.isLogin">
        <el-menu-item v-for="(item,index) in playlist" :key="item.id" :index="''+index"  style="text-overflow: ellipsis;" @click="changeRoute('songListDetail',item.id)">
            <i v-if="!(item.creator.userId ==store.state.userInfo.userId)" class="iconfont icon-gedan"></i>
            <i v-else class="iconfont icon-aixin1" style="color: rgb(236, 65, 65);"></i>
            {{item.name}}
        </el-menu-item>
    </el-menu-item-group>
</el-menu>
</template>

<script setup>
import { getPersonal, getUserList } from '../api/list'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import {  ref } from 'vue';
let store = useStore();
let route = useRoute();
let router = useRouter();
let playlist=ref([]);
function changeRoute(to,id)
{
    if (to =='songListDetail')
    {
        router.push({ name: to ,query:{id,}});
        return;
    }
    if (route.name == to)
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
function init() {
    getUserList(store.state.userInfo.userId).then(res => {
        playlist.value = res.data.playlist;
    })
}
if(store.state.isLogin)
{
    init();
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
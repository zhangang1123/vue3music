<template>
<div class="search_list">
    <div class="font-bold">找到 {{total}} 个结果</div>
    <ul class="search-menu">
        <li class="search-menu-item" :class="{ isActive: current_opt =='1'}" @click="getList('1')"> 单曲 </li>
        <li class="search-menu-item" :class="{ isActive: current_opt =='10'}" @click="getList('10')"> 专辑 </li>
        <li class="search-menu-item" :class="{ isActive: current_opt =='100'}" @click="getList('100')"> 歌手 </li>
        <li class="search-menu-item" :class="{ isActive: current_opt =='1000'}" @click="getList('1000')"> 歌单 </li>
        <li class="search-menu-item" :class="{ isActive: current_opt =='1002'}" @click="getList('1002')"> 用户 </li>
        <li class="search-menu-item" :class="{ isActive: current_opt =='1004'}" @click="getList('1004')"> MV </li>
    </ul>
    <songs v-if="current_opt=='1'"/>
    <ul class="new_list" v-else-if="current_opt == '1000'">
        <li class="new_item" v-for="(item,index) in playList" :key="item.id" @click="songList_view(item.id)">
            <div class="index">{{index+1}}</div>
            <img :src="item.coverImgUrl" alt="newMusic">
            <div class="sub-title font-14 mleft-10">{{ item.name }}</div>
            <div class="sub-item font-12" style="color: rgb(103, 103, 103);">{{ item.trackCount }}首</div>
            <div class="sub-item font-12" style="width: 100px;text-align: center;"> by {{ item.creator.nickname }} </div>
        </li>
    </ul>
    <ul class="new_list" v-else-if="current_opt=='100'">
        <li class="new_item" v-for="item in singerList" :key="item.id" @click="songList_view(item.id,'singer')">
            <img :src="item.img1v1Url" alt="newMusic">
            <div class="sub-title font-14 mleft-10">{{item.name}}</div>
        </li>
    </ul>
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="30" @current-change="changePage" style="margin-bottom:60px"/>
</div>
</template>

<script setup>
import songs from "./songListDetail/songs.vue";
import { getSearchList } from '../api/list';
import {ref,reactive,provide,watch} from 'vue';
import {useRoute,useRouter} from 'vue-router';
const route= useRoute();
const router= useRouter();
let current_opt=ref('0');
let songList = reactive({tracks:[]});
provide('songsDetails', songList);
let playList=ref([]);
let singerList=ref([]);
let total= ref(0);
watch(() => route.query.keywords, () => {
    getList('1',0,false);
},{ immediate: true ,deep: true})
function songList_view(id,type='songList') {
    if(type=='songList')
        router.push({ name: 'songListDetail', query: { id, } });
    else if(type=='singer')
        router.push({ name: 'singerDetail', query: { id, } })
}
function changePage(p){
    getList(current_opt.value,p-1,false);
}
async function getList(type,page=0,isPage=true){
    if (current_opt.value==type&&isPage)
    return;
    current_opt.value = type
    const res = await getSearchList(route.query.keywords, current_opt.value,page*30);
    if(current_opt.value=='1')
    {
        songList.tracks=[...res.data.result.songs];
        total.value = res.data.result.songCount;
    }else if(current_opt.value=='1000')
    {
        playList.value = res.data.result.playlists
        total.value = res.data.result.playlistCount;
    }else if(current_opt.value=='100')
    {
        total.value = res.data.result.artistCount;
        singerList.value= res.data.result.artists;
    }
}
</script>

<style scoped>
.new_item {
    display: flex;
    height: 90px;
    align-items: center;
    cursor: pointer;
}

.new_item:hover {
    background-color: #f2f2f2;
}

.new_item img {
    height: 60px;
    width: 60px;
    border-radius: 4px;
    margin-left: 10px;
}

.index {
    width: 50px;
    text-align: center;
    color: #cfcfdf;
}

.sub-title {
    min-width: 100px;
    flex: 1;
}

.sub-item {
    width: 150px;
    color: #c3c3c4;
}
.search_list{
    width: 80%;
    margin:0 auto;
    margin-top:20px;
}
.search-menu{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 20px 0;
}
.search-menu-item{
    width: 40px;
    margin-right: 20px;
    line-height: 1;
    text-align: center;
    cursor: pointer;
}
.isActive{
    font-size: 16px;
    font-weight: bold;
    border-bottom: 5px solid red;
}
</style>
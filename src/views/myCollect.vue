<template>
<ul class="search-menu">
    <li class="search-menu-item" :class="{ isActive: current_opt == 'album' }" @click="current_opt='album'"> 专辑 </li>
    <li class="search-menu-item" :class="{ isActive: current_opt == 'singer' }" @click="current_opt='singer'"> 歌手 </li>
</ul>
<div class="albumList" v-show="current_opt == 'album'">
    <div>
        <div >
            <span class="font-bold">收藏的专辑</span>
            <span class="font-12" style="color: rgb(207, 207, 207);">({{ albumList.count }})</span>
        </div>
    </div>
    <ul class="new_list">
        <li class="new_item" v-for="(item,index) in albumList.data" :key="item.id||index" @click="album_view(item.id)">
            <div class="index">{{index+1}}</div>
            <img :src="item.picUrl" alt="mycollect">
            <div class="sub-title font-14 mleft-10">{{item.name}}</div>
            <div class="sub-item font-12" style="color: rgb(103, 103, 103);">{{ item.artists [0].name}}</div>
            <div class="sub-item font-12" style="color: rgb(103, 103, 103);">{{ item.size }}首</div>
        </li>
    </ul>
</div>
<div class="albumList" v-show="current_opt == 'singer'">
    <div>
        <div>
            <span class="font-bold">收藏的歌手</span>
            <span class="font-12" style="color: rgb(207, 207, 207);">({{ singerList.count }})</span>
        </div>
    </div>
    <ul class="new_list">
        <li class="new_item" v-for="(item,index) in singerList.data" :key="item.id||index" @click="singer_view(item.id)">
            <div class="index">{{index+1}}</div>
            <img src="../assets/img/music.jpg" alt="mycollect">
            <div class="sub-title font-14 mleft-10">{{ item.name}}</div>
            <div class="sub-item font-12" style="color: rgb(103, 103, 103);">专辑:{{item.albumSize}}首</div>
            <div class="sub-item font-12" style="color: rgb(103, 103, 103);">MV:{{item.mvSize}}首</div>
        </li>
    </ul>
</div>
</template>

<script setup>
import { getCollectAlbum, getCollectArtist } from '../api/list';
import { ref} from 'vue';
import {useRouter} from 'vue-router';
const router = useRouter();
let current_opt = ref('album');
let albumList = ref({}); 
let singerList = ref({});
function getSingerList(){
    getCollectArtist().then(res=>{
        singerList.value=res.data;
        console.log(res.data);
    })
}
function getAlbumList(){
    getCollectAlbum().then(res => {
        albumList.value=res.data;
    })
}
function album_view(id) {
    router.push({name: "albumDetail", query: { id, }});
}
function singer_view(id) {
    router.push({ name: "singerDetail", query: { id, } });
}
getAlbumList();
getSingerList();
</script>

<style scoped>
.search-menu {
    padding-left:10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 20px 0;
}
.search-menu-item {
    width: 40px;
    margin-right: 20px;
    line-height: 1;
    text-align: center;
    cursor: pointer;
}
.isActive {
    font-size: 16px;
    font-weight: bold;
    border-bottom: 5px solid red;
}
.albumList{
    width: 80%;
    margin: 0 auto;
}
.new_item {
    display: flex;
    height: 90px;
    align-items: center;
    cursor: pointer;
}
.new_list{
    margin-bottom: 50px;
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
</style>
<template>
  <div class="new_music">
    <div class="new_header">
        <div class="btn_group">
            <button class="new_btn" :class="{ current_btn: currentState }" @click="currentState=true">新歌速递</button>
            <button class="new_btn" :class="{ current_btn: !currentState }" @click="getalbum()">新碟上架</button>
        </div>
    </div>
    <div class="newMusic" v-if="currentState">
        <div class="kinds">
            <div class="areas">
                <button class="no-btn mright-10 font-16" :class="{ fontWeight: currentArea == 0}" @click="changeArea(0)"> 全部 </button>
                <button class="no-btn mright-10 font-16" :class="{ fontWeight: currentArea == 7}"  @click="changeArea(7)"> 华语 </button>
                <button class="no-btn mright-10 font-16" :class="{ fontWeight: currentArea == 96}" @click="changeArea(96)"> 欧美 </button>
                <button class="no-btn mright-10 font-16" :class="{ fontWeight: currentArea == 8}" @click="changeArea(8)"> 日本 </button>
                <button class="no-btn mright-10 font-16" :class="{ fontWeight: currentArea == 16}" @click="changeArea(16)"> 韩国 </button>
            </div>
            <div>
                <button class="btn btn-red">
                    <i class="iconfont icon-bofang"></i>
                    <span class="btn-text">播放全部</span>
                </button>
                <button class="btn btn-white mleft-12">
                    <el-icon>
                        <FolderAdd />
                    </el-icon>
                    <span class="btn-text">收藏全部</span>
                </button>
            </div>
    
        </div>
        <el-skeleton :rows="5" animated v-show="gujia"/>
        <ul class="new_list">
            <li class="new_item" v-for="(song,index) in newSongList" :key="song.id" @click="playSong(song)">
                <div class="index">{{index+1}}</div>
                <img :src="song.album.picUrl" alt="newMusic">
                <div class="sub-title font-14 mleft-10"> {{ song.name}} </div>
                <div class="sub-item font-12" style="color: rgb(103, 103, 103);">{{ song.artists[0].name }}}</div>
                <div class="sub-item font-12">{{  song.album.name}}</div>
                <div class="sub-item font-12" style="width: 100px;text-align: center;"> {{ formatTime(song.duration) }} </div>
            </li>
        </ul>
    </div>
    <ul class="recommandList" v-else>
        <li class="recommandItem" v-for="item in Albums" :key="item.id">
            <img :src="item.picUrl" alt="歌单封面">
            <div class="songList_info">{{item.name}}</div>
            <div class="play-btn"><i class="iconfont icon-bofang" style="line-height:32px"></i></div>
        </li>
    </ul>
  </div>
</template>

<script setup>
import { FolderAdd } from '@element-plus/icons-vue';
import { getSongDetails } from "../../api/playlist";
import { getNewSong, getNewalbum } from '../../api/list';
import {ref,onMounted} from 'vue';
import {useStore} from 'vuex';
const store = useStore();
let currentState=ref(true);
let newSongList=ref([]);
let gujia=ref(true);
let currentArea=ref(0);
let Albums=ref([]);
onMounted(async ()=>{
    const res=await getNewSong();
    newSongList.value=res.data.data;
    gujia.value=false;
    getalbum();
})
function formatTime(dt) {
    let date = new Date(dt)
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return m + s;
}
async function changeArea(a) {
    if (a == currentArea.value)
        return;
    newSongList.value=[];
    gujia.value= true;
    currentArea.value = a
    const res = await getNewSong(a);
    newSongList.value = res.data.data;
    gujia.value= false;
}
async function getalbum(){
    if (currentState.value==false)
        return;
    currentState.value = false
    const res = await getNewalbum();
    Albums.value=res.data.weekData;
}
async function playSong(song) {
    const res = await getSongDetails(song.id);
    let songInfo = {
        id: res.data.songs[0].id, name: res.data.songs[0].name, duration: formatTime(song.duration),
        cover: res.data.songs[0].al.picUrl, ar: res.data.songs[0].ar[0].name, url: '', alname: res.data.songs[0].al.name
    }
    store.dispatch('changeSong', { id: song.id, songInfo });
}
</script>

<style scoped>
.new_music{
    width:80%;
    margin:0 auto;
}
.new_header{
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fontWeight{
    font-weight: bold;
}
.btn_group{
    width: 202px;
    height: 32px;
    border: 1px solid #bbbbbb;
    border-radius: 16px;
}
.new_btn{
    width: 100px;
    height: 30px;
    outline: 0;
    border: 0;
    border-radius: 15px;
    box-sizing: border-box;
    color: #373737;
    background-color: #fff;
    transition: all 0.5s;
}
.current_btn{
        background-color: #bbbbbb;
        color: #fff;
}
.recommandList {
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.recommandItem {
    position: relative;
    margin-bottom: 30px;
    width: 18%;
    margin-right: 2%;
    background-color: #fff;
    cursor: pointer;
}
.recommandItem img {
    width: 100%;
    border-radius: 8px;
}
.songList_info {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.play-btn {
    position: absolute;
    right: 15px;
    bottom: 45px;
    background-color: #fbf7f6;
    color: #ec4141;
    width: 32px;
    text-align: center;
    height: 32px;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 1s;
}
.recommandItem:hover .play-btn {
    opacity: 1;
}
.no-btn {
    padding: 1px 6px;
}

.newMusic {
    margin-top: 20px;
}

.kinds {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
}

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
</style>
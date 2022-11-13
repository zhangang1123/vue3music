<template>
<div class="charts" v-loading="isShow">
    <h2 style="font-size:20px;font-weight: bold">官方榜</h2>
    <div class="official_list" v-for="item in officialList" :key="item.id" >
        <div class="official_item">
            <div class="item_left" @click="songList_view(item.id)">
                <img :src="item.coverImgUrl" alt="list" class="img-radius-4">
                <div class="play-btn"><i class="iconfont icon-bofang" style="line-height:32px"></i></div>
            </div>
            <ul> 
                <li v-for="(song,index) in item.tracks.slice(0,5)" :key="song.id" @click=playSong(song,item)>
                    <span class="mleft-12" :style="[{color:(index<=2?'red':'#000')}]">{{index+1}}</span>
                    <span class="mleft-12">{{song.name}}</span>
                    <span class="mright-10" style="float:right;color:#9b9b9b;">{{ song.ar[0].name}}</span>
                </li>
            </ul>
        </div>
        <div class="mleft-200"><button class="pointer no-btn" @click="songList_view(item.id)"> 
            查看全部<el-icon><ArrowRight /></el-icon>
        </button>
        </div>
    </div>
    <h2 style="font-size:20px;font-weight: bold">全球榜</h2>
    <div class="global_list">
        <ul class="recommandList">
            <li class="recommandItem"  v-for="list in allList" :key="list.id" @click="songList_view(list.id)">
                <img :src="list.coverImgUrl" alt="歌单封面">
                <div class="songList_info">{{list.name}}</div>
                <div class="songList_views"><i class="iconfont icon-24gl-play"></i> {{ Math.ceil(list.playCount /10000)}}万
                </div>
                <div class="play-btn" style="right: 15px;bottom: 45px;transform: translate(0,0);"><i class="iconfont icon-bofang" style="line-height:32px"></i></div>
            </li>
        </ul>
    </div>
</div>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { getListDetail, getAllList } from '../../api/list';
import { getSongDetails } from '../../api/playlist'
import {onMounted,reactive,ref} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
let router = useRouter();
let store = useStore();
let isShow=ref(true);
let officialList = reactive([]);
let allList =ref([]);
let ids = [3779629, 19723756, 2884035, 3778678];
onMounted(async ()=>{
    for(let id of ids)
    {
        const res = await getListDetail(id);
        officialList.push(res.data.playlist);
        isShow.value = false;
    }
    const res = await getAllList();
    allList.value = res.data.list.slice(4);
})
function songList_view(id) {
    router.push({ name: 'songListDetail', query: { id, } });
}
function formatTime(dt) {
    let date = new Date(dt)
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return m + s;
}
async function playSong(song,songlist) {
    const res = await getSongDetails(song.id);
    let songInfo = {
        id: res.data.songs[0].id, name: res.data.songs[0].name, duration: formatTime(song.dt),
        cover: res.data.songs[0].al.picUrl, ar: res.data.songs[0].ar[0].name, url: '', alname: res.data.songs[0].al.name
    }
    store.dispatch('changeSong', { id:song.id, songInfo });
    store.commit('changePlaylist', songlist);
}
</script>

<style scoped>
.global_list{
    margin-bottom:60px;
}
.charts{
    width:80%;
    margin:0 auto;
}
.official_item{
    display:flex;
    margin-top: 10px;
    margin-bottom:20px;
}
.item_left{
    width: 160px;
    height:160px;
    position: relative;
}
.item_left img{
    width:100%;
    height:100%;
}
.play-btn {
    position: absolute;
    right: 50%;
    bottom: 50%;
    transform: translate(50%,50%);
    background-color: #fbf7f6;
    color: #ec4141;
    width: 40px;
    text-align: center;
    height: 40px;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 1s;
}
.item_left:hover .play-btn{
    opacity: 1;
}
.official_item ul{
    flex-grow: 1;
    margin-left: 30px;
}
.official_item ul li{
    height: 32px;
        line-height: 32px;
}
.official_item ul li:nth-child(3) {
    background-color: #efefef;
}
.official_item ul li:hover {
    background-color: #f2efef;
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
.recommandItem:hover .play-btn{
    opacity: 1;
}
.recommandItem img {
    width: 100%;
    border-radius: 8px;
}

.songList_views {
    color: #ffffff;
    position: absolute;
    right: 10px;
    top: 10px;
    text-shadow: 0 0 2px #000;
}

.songList_info {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
<template>
<div class="singer">
    <div class="singer_info">
        <div class="image">
            <img :src="singer_info.img1v1Url" alt="singer">;
        </div>
        <div  class="info">
            <div  class="font-24 font-bold">{{singer_info.name}}</div>
            <div  class="info-btn">
                <button  class="btn btn-white mleft-10">
                <span> <el-icon><FolderAdd/></el-icon> 收藏</span>
            </button>
            </div>
            <div >
                <span  class="font-14">单曲数:{{ singer_info.musicSize}}</span>
                <span  class="mleft-20 font-14">专辑数:{{ singer_info.albumSize }}</span>
            </div>
        </div>
    </div>
    <ul class="routeList">
        <li class="routeItem" :class="{ actived: currentOpt =='album'}" @click="changeRoute('album')">专辑</li>
        <li class="routeItem" :class="{ actived: currentOpt =='singerDeatil'}" @click="changeRoute('singerDeatil')">歌手详情</li>
        <li class="routeItem" :class="{ actived: currentOpt =='similar'}" @click="changeRoute('similar')">相似歌手</li>
    </ul>
    <div class="album" v-if="currentOpt == 'album'">
        <div class="album_list">
            <div style="width: 200px;">
                <img src="../assets/img/top50.png" class="img img-radius-8 img-border">
            </div>
            <div class="songs">
                <div>
                    <span  class="font-bold">热门50首</span>
                    <button class="no-btn mleft-20 font-20">
                        <el-icon><VideoPlay/></el-icon>
                    </button>
                </div>
                <songs style="margin-bottom:0px"/>
                <button  class="pointer no-btn mtop-10" style="float:right;" @click="viewAll()"> 查看全部50首
                    <el-icon><ArrowRight /></el-icon>
                </button>
            </div>
        </div>
        <ul class="recommandList">
            <li class="recommandItem" v-for="item in hotAlbums" :key="item.id" @click="album_view()">
                <img :src="item.picUrl" alt="专辑封面">
                <div class="songList_info">{{ item.name }}</div>
            </li>
        </ul>
    </div>
    <div class="introduce" v-else-if="currentOpt=='singerDeatil'">
        <div class="mtop-20">
            <h2 class="font-bold font-14">个人简介</h2>
            <div class="my-pre font-14">
                <p>{{ singerIntroduce.briefDesc }}</p>
            </div>
        </div>
        <div class="mtop-20" v-for="item in singerIntroduce.introduction" :key="item.ti">
            <h2 class="font-bold font-14">{{item.ti}}</h2>
            <div class="my-pre font-14">
                <p >{{item.txt}}</p>
            </div>
        </div>
    </div>
    <ul class="recommandList" v-else>
        <li class="recommandItem" v-for="item in similarSinger" :key="item.id" @click="singer_view(item.id)">
            <img :src="item.img1v1Url" alt="歌手封面">
            <div class="songList_info">{{ item.name }}</div>
        </li>
    </ul>
</div>
</template>

<script setup>
import songs from './songListDetail/songs.vue';
import { FolderAdd, VideoPlay, ArrowRight } from '@element-plus/icons-vue';
import { getSingerIntro, getSingerAlbum, getTop, getSimiSinger } from '../api/list';
import {ref,provide,watch} from 'vue';
import {useRoute,useRouter} from 'vue-router';
const route = useRoute();
const router = useRouter();
let allSong;
let singer_info=ref({});
let hotAlbums =ref([]);
let songsDetails=ref({tracks:[]});
provide('songsDetails', songsDetails);
let currentOpt=ref('album');
let singerIntroduce=ref({});
let similarSinger=ref([]);
watch(currentOpt, (newval)=>{
    if (newval =='singerDeatil')
    {
        getintroduce(route.query.id);
    } else if (newval == 'similar')
    {
        getSimilar(route.query.id);
    }
})
watch(() =>route.query.id,()=>{
    init();
    currentOpt.value='album';
},{ immediate: true})
function changeRoute(to){
    currentOpt.value =to;
}
function singer_view(id) {
    router.push({ name: 'singerDetail', query: { id, } });
}
function album_view() {
    console.log('111')
    router.push({ name: "albumDetail" });
}
function viewAll()
{
    songsDetails.value.tracks=allSong;
}
async function getintroduce(id){
    const res = await getSingerIntro(id);
    singerIntroduce.value=res.data;
}
async function getSimilar(id){
    const res = await getSimiSinger(id);
    similarSinger.value = res.data.artists;
}
function init(){
    getSingerAlbum(route.query.id, 20).then(res => {
        singer_info.value = res.data.artist;
        hotAlbums.value = res.data.hotAlbums;
    })
    getTop(route.query.id).then(res => {
        allSong = res.data.songs
        songsDetails.value.tracks = allSong.slice(0, 10);
    })
}
</script>

<style scoped>
.introduce{
    margin-bottom: 100px;
}
.songs{
    margin-left: 40px;
    width: 80%;
}
.album_list{
    display: flex;
    margin-top:60px;
}
.my-pre {
    text-indent: 2em;
    line-height: 2;
    width: 100%;
}
.my-pre p{
    color:#676767;
}
.singer {
    width: 80%;
    margin: 0 auto;
    margin-top:20px;
}
.singer_info{
    display: flex;
}
.image {
    width: 200px;
    height: 200px;
}
.image img {
    box-sizing: border-box;
    border: 1px solid #dddddd;
    border-radius: 8px;
}
.info{
    margin-left: 30px;
    line-height: 50px;
}
.routeList {
    margin-top: 7px;
    display: flex;
    font-size: 14px;
    cursor: pointer;
}
.routeItem {
    margin: 10px;
}
.actived {
    font-size: 18px;
    font-weight: bold;
    color: #2c3e50;
}
.actived::after {
    display: block;
    content: '';
    height: 4px;
    width: 90%;
    margin: 0 auto;
    background-color: #ec4141;
    border-radius: 2px;
}
.recommandList {
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 100px;
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
</style>
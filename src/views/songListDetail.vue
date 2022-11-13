<template>
<div class="songlist_details">
  <div class="detail_header">
    <div class="detailImg">
        <img :src="songsDetails.coverImgUrl" alt="">
    </div>
    <div class="songlist_info">
        <div class="info_title">
            <div class="tag">歌单</div>
            <span style="font-size:20px;font-weight: bold;margin-left:14px;">{{ songsDetails.name }}</span>
        </div>
        <div class="auther">
            <div class="auther_img">
                <img :src="songsDetails.coverImgUrl" alt="">
            </div>
            <div class="auther-info">
                <span>YouTube全球音乐</span>
                <span style="margin-left:12px;font-size:12px">{{ useTimestamps(songsDetails.updateTime) }}</span>
            </div>
        </div>
        <el-row class="mb-4">
            <el-button type="danger" :icon="VideoPlay" round>播放全部</el-button>
            <el-button class="none" :icon="FolderChecked"   round>收藏({{ Math.floor(songsDetails.subscribedCount/10000) }}万)</el-button>
            <el-button class="none" :icon="Share"  round>分享({{ songsDetails.shareCount }})</el-button>
            <el-button type="danger" :icon="HotWater"  round>加载完整歌单</el-button>
        </el-row>
        <div class="tags">
            <span>标签：</span>
            <span style="margin-right: 10px;" v-for="(tag,index) in songsDetails.tags" :key="index">{{tag}}</span>
        </div>
        <div class="tags">
            <span>歌曲：{{songsDetails.trackCount}}</span>
            <span style="margin-left: 12px;">播放：{{ Math.floor(songsDetails.playCount /10000)}}万</span>
        </div>
        <div class="introduce" :class="{showIntroduce,}">
            <p style="max-width: 1000px;">{{ songsDetails.description }}</p>
        </div>
        <el-icon v-show="!showIntroduce" @click="showIntroduce=true">
            <CaretBottom />
        </el-icon>
        <el-icon v-show="showIntroduce" @click="showIntroduce=false">
            <CaretTop />
        </el-icon>
    </div>
  </div>
    <ul class="routeList">
        <li class="routeItem" @click="changeRoute('songs')" :class="{ actived: currentPage =='songs'}">歌曲列表</li>
        <li class="routeItem" @click="changeRoute('comment')" :class="{ actived: currentPage =='comment'}">评论(400)</li>
        <li class="routeItem" @click="changeRoute('收藏')" :class="{ actived: currentPage =='收藏'}">收藏</li>
    </ul>
    <component :is="currentOpt[currentPage]"></component>
</div>
</template>

<script setup>
import { VideoPlay, Share, HotWater, FolderChecked, CaretBottom, CaretTop, Timer } from '@element-plus/icons-vue';
import songs from './songListDetail/songs.vue';
import comment from './songListDetail/comment.vue'
import { useRoute } from 'vue-router';
import { playlistDetail } from '../api/playlist';
import {useTimestamps } from '../hooks/timestamp';
import { watch, ref,provide} from 'vue';
let currentOpt=ref({songs,comment,})
const route=useRoute();
let showIntroduce=ref(false);
let currentPage = ref('songs');
let songsDetails = ref({});
provide('songsDetails', songsDetails);
function changeRoute(to)
{
    currentPage.value=to;
}
async function songlistDetail(id){
    const res=await playlistDetail(id);
    console.log(res.data.playlist.tracks);
    songsDetails .value=res.data.playlist
}
songlistDetail(route.query.id)
</script>

<style scoped>
.table-header{
    width: 100%;
    color: #606266;
    font-size: 12px
}
.none:hover {
     background: #d8d8d8 !important;
     color: #000 !important
}
.detailImg{
    width:180px;
    height:180px;
}
.detailImg img{
    height:100%;
    width:100%;
    border-radius: 8px;
}
.detail_header{
    
    display:flex;
}
.songlist_details{
    width: 80%;
    margin: 0 auto;
}
.tag{
    display: inline-block;
    border: 1px solid #ec4141;
    padding: 0 2px;
    font-size: 14px;
    height: 22px;
    line-height: 22px;
    color: #ec4141;
    border-radius: 2px;
}
.songlist_info{
    margin-left:20px;
}
.auther{
    margin:5px 0px;
    display: flex;
    align-items: center;
}
.auther_img{
    height:24px;
    cursor: pointer;
}
.auther_img img{
    height:100%;
    border-radius: 50%;
}
.auther-info :nth-child(1){
    color: rgb(11, 88, 176);
    font-size: 12px;
    margin-left: 12px;
    cursor: pointer;
}
.tags{
    line-height:24px;
    font-size: 14px;
}
.introduce {
    max-height: 20px;
    overflow: hidden;
    transition: max-height 1s
}
.showIntroduce{
    max-height: 666px;
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
</style>
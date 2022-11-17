<template>
<div class="album_detail">
    <div class="detail_header">
        <div class="detailImg">
            <img :src="albumInfo.blurPicUrl" alt="">
        </div>
        <div class="songlist_info">
            <div class="info_title">
                <div class="tag">专辑</div>
                <span style="font-size:20px;font-weight: bold;margin-left:14px;">{{albumInfo.name}}</span>
            </div>
            <ul style="margin:5px 0;">
                <button  class="btn btn-red">
                    <i class="iconfont icon-bofang"></i>
                    <span  class="btn-text">播放全部</span>
                </button>
                <button class="btn btn-white mleft-10" @click="handletAlbum()">
                    <el-icon v-if="!sizeOfAlbum.isSub"><FolderAdd /></el-icon>
                    <el-icon v-else><FolderChecked /></el-icon>
                    <span class="btn-text"> 收藏({{ sizeOfAlbum.subCount }})</span>
                </button>
                <button class="btn btn-white mleft-10">
                    <i  class="iconfont icon-fenxiang"></i>
                    <span  class="btn-text">分享({{ sizeOfAlbum.shareCount }})</span>
                </button>
            </ul>
            <div class="font-14" style="margin:5px 0;">
                <span >歌手：</span>
                <span class="pointer" style="color:#3771dd;">{{ albumInfo.artist&&albumInfo.artist.name }} </span>
            </div>
            <div ><span class="font-14"> 时间：{{ useTimestamps(albumInfo.publishTime)}}</span></div>
        </div>
    </div>
    <ul class="routeList">
        <li class="routeItem" :class="{ actived: currentPage =='songs'}" @click="changeOpt('songs')">歌曲列表</li>
        <li class="routeItem" :class="{ actived: currentPage =='comment'}" @click="changeOpt('comment')">评论({{ sizeOfAlbum.commentCount }})</li>
        <li class="routeItem" :class="{ actived: currentPage =='introduce'}" @click="changeOpt('introduce')">专辑详情</li>
    </ul>
    <songs v-show="currentPage=='songs'"/>
    <comment type="album" :albumId="route.query.id" v-show="currentPage=='comment'"/>;
    <div class="introduce" v-show="currentPage =='introduce'">
        <div class="font-bold">专辑介绍</div>
        <div class="my-pre">
            <p v-for="(item,index) in albumInfo.description.split('\n')" :key="index">{{item}}</p>
        </div>
    </div>
</div>
</template>

<script setup>
import songs from './songListDetail/songs.vue';
import comment from './songListDetail/comment.vue';
import { FolderAdd, FolderChecked } from '@element-plus/icons-vue';
import { useTimestamps } from '../hooks/timestamp';
import { albumDetail, albumInfoSize } from '../api/list';
import { collectAlbum } from '../api/handle';
import {ref,provide} from 'vue';
import {useRoute} from 'vue-router';
const route = useRoute();
let currentPage= ref('songs');
let songList = ref({tracks:[]});
let albumInfo = ref({ description:'' });
let sizeOfAlbum = ref({});
provide('songsDetails', songList);
function changeOpt(to)
{
    currentPage.value=to;
}
function handletAlbum(){
    let t=sizeOfAlbum.value.isSub?0:1;
    if(t==0)
    {
        ElMessageBox.confirm(
            '确认要取消收藏这个专辑吗？',
            'Warning',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            collect(t)
        })
    }else{
        collect(t);
    }
}
async function collect(t){
    const res = await collectAlbum(route.query.id, t);
    console.log(res);
    if(t==0)
    {
        sizeOfAlbum.value.isSub=false;
        ElMessage({
            type: 'success',
            message: '取消收藏成功'
        })
    }else{
        sizeOfAlbum.value.isSub = true;
        ElMessage({
            type: 'success',
            message: '收藏成功'
        })
    }
}
function init(){
    albumDetail(route.query.id).then(res => {
        songList.value.tracks = res.data.songs;
        albumInfo.value = res.data.album;
    })
    albumInfoSize(route.query.id).then(res => {
        sizeOfAlbum.value = res.data;
    })
}
init();
</script>

<style scoped>
.my-pre {
    text-indent: 2em;
    line-height: 2;
    width: 100%;
}
.my-pre p {
    color: #676767;
}
.album_detail{
    width: 80%;
    margin: 0 auto;
}
.detail_header {

    display: flex;
}
.tag {
    display: inline-block;
    border: 1px solid #ec4141;
    padding: 0 2px;
    font-size: 14px;
    height: 22px;
    line-height: 22px;
    color: #ec4141;
    border-radius: 2px;
}
.detailImg {
    width: 180px;
    height: 180px;
}
.detailImg img {
    height: 100%;
    width: 100%;
    border-radius: 8px;
}
.songlist_info {
    margin-left: 20px;
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
<template>
<div class="album_detail">
    <div class="detail_header">
        <div class="detailImg">
            <img src="../assets/img/music.jpg" alt="">
        </div>
        <div class="songlist_info">
            <div class="info_title">
                <div class="tag">专辑</div>
                <span style="font-size:20px;font-weight: bold;margin-left:14px;">魔杰座</span>
            </div>
            <ul style="margin:5px 0;">
                <button  class="btn btn-red">
                    <i class="iconfont icon-bofang"></i>
                    <span  class="btn-text">播放全部</span>
                </button>
                <button class="btn btn-white mleft-10">
                    <el-icon><FolderAdd /></el-icon>
                    <!-- <el-icon><FolderChecked /></el-icon> -->
                    <span class="btn-text"> 收藏(1444)</span>
                </button>
                <button class="btn btn-white mleft-10">
                    <i  class="iconfont icon-fenxiang"></i>
                    <span  class="btn-text">分享(171)</span>
                </button>
            </ul>
            <div class="font-14" style="margin:5px 0;">
                <span >歌手：</span>
                <span class="pointer" style="color:#3771dd;">林俊杰 </span>
            </div>
            <div ><span class="font-14"> 时间：2022-11-02</span></div>
        </div>
    </div>
    <ul class="routeList">
        <li class="routeItem" :class="{ actived: currentPage =='songs'}">歌曲列表</li>
        <li class="routeItem" :class="{ actived: currentPage =='comment'}">评论(190)</li>
        <li class="routeItem" :class="{ actived: currentPage =='introduce'}">专辑详情</li>
    </ul>
</div>
</template>

<script setup>
import songs from './songListDetail/songs.vue';
import { FolderAdd, FolderChecked } from '@element-plus/icons-vue';
import {ref} from 'vue';
let currentPage= ref('songs');
</script>

<style scoped>
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
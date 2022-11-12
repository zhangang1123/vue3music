<template>
<div class="songlist">
    <div class="sheader">
        <img class="h_back" src="../../assets/img/music.jpg" alt="err">
        <img class="main_img" src="../../assets/img/login.jpg" alt="err">
        <div class="info_title">
            <div>
                <button class="my_button">
                    <i class="iconfont icon-huiyuanhuangguanguanjun-xianxing"></i>
                    精品歌单
                </button>
            </div>
            <div style="margin-top:10px">
                <span>流光美人，香港电影十二钗</span>
            </div>
        </div>
    </div>
    <div class="list-tags">
        <el-button round class="none">
            华语
            <el-icon><ArrowRight /></el-icon>
        </el-button>
        <ul class="tags_ul">
            <li class="tag actived">华语</li>
            <li class="tag">流行</li>
            <li class="tag">摇滚</li>
            <li class="tag">民谣</li>
            <li class="tag">电子</li>
            <li class="tag">另类/独立</li>
            <li class="tag">轻音乐</li>
            <li class="tag">综艺</li>
            <li class="tag">影视原声</li>
            <li class="tag">ACG</li>
        </ul>
    </div>
    <ul class="recommandList">
        <li class="recommandItem"  v-for="(item,index) in 20" :key="index">
            <img src="../../assets/img/music.jpg" alt="歌单封面">
            <div class="songList_info">[一周影视热歌] 梅林茂等为纪录fseesf</div>
            <div class="songList_views"><i class="iconfont icon-24gl-play"></i> 1000万
            </div>
            <div class="play-btn"><i class="iconfont icon-bofang" style="line-height:32px"></i></div>
        </li>
    </ul>
</div>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue';

</script>

<style scoped>
.tag{
    font-size:12px;
    padding: 0 10px;
    margin-right: 10px;
    height:26px;
    line-height:26px;
    text-align:center;
    cursor: pointer;
}
.actived{
    background-color: #fdf5f5;
    color: #ec4141;
    border-radius: 13px;
}
.tags_ul{
    display:flex;
}
.none{
    padding:0 30px;
}
.none:hover {
    background: #f0ecec !important;
    color: #2c3e50 !important
}
.list-tags{
    margin-top:10px;
    display: flex;
    justify-content:space-between;
}
.info_title{
    z-index: 10;
}
.my_button{ 
    display: block;
    height: 30px;
    padding: 0 16px;
    outline: 0;
    border: 1px solid #e7aa5a;
    color: #e7aa5a;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 15px;
}
.main_img{
    margin: 0 20px;
    border-radius: 6px;
    z-index: 2;
    height: 80%;
    max-width: 100%
}
.songlist{
    width: 85%;
    margin: 0 auto;
}
.sheader{
    background-color: rgba(0, 0, 0, 0);
    height: 200px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
}
.h_back{
    position: absolute;
    top: -400px;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    width: 100%;
    filter: blur(45px);
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
.recommandList {
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;
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
<template>
<div class="songlist" v-loading="loading">
    <div class="sheader">
        <img class="h_back" :src="highQuality.coverImgUrl" alt="err">
        <img class="main_img" :src="highQuality.coverImgUrl" alt="err">
        <div class="info_title">
            <div>
                <button class="my_button">
                    <i class="iconfont icon-huiyuanhuangguanguanjun-xianxing"></i>
                    精品歌单
                </button>
            </div>
            <div style="margin-top:10px">
                <span>{{ highQuality.name}}</span>
            </div>
        </div>
    </div>
    <div class="list-tags">
        <el-button round class="none" @click.stop="getTags">
            {{ playlist.cat }}
            <el-icon><ArrowRight /></el-icon>
            <div class="all-tags" v-show="showTags" >
                <div class="tags_title">全部歌单</div>
                <div class="tags_classes" v-for="(item,index) in categories" :key="index">
                    <div class="tags_left">
                        <i class="iconfont font-24" :class="icon[index]"></i>
                        <span style="margin-left:6px">{{item}}</span>
                    </div>
                    <ul class="tags_ul">
                        <li v-for="item in tags[index]" :key="item" class="tag" :class="{ actived: playlist.cat == item.name }" @click="changePlaylist(item.name)">
                            {{item.name}}
                        </li>
                    </ul>
                </div>
            </div>
        </el-button>
        <ul class="tags_ul">
            <li class="tag" :class="{ actived: playlist.cat=='华语' }"  @click="changePlaylist('华语')">华语</li>
            <li class="tag" :class="{ actived: playlist.cat=='流行' }" @click="changePlaylist('流行')">流行</li>
            <li class="tag" :class="{ actived: playlist.cat=='摇滚' }" @click="changePlaylist('摇滚')">摇滚</li>
            <li class="tag" :class="{ actived: playlist.cat=='民谣' }" @click="changePlaylist('民谣')">民谣</li>
            <li class="tag" :class="{ actived: playlist.cat=='电子' }" @click="changePlaylist('电子')">电子</li>
            <li class="tag" :class="{ actived: playlist.cat =='另类/独立' }" @click="changePlaylist('另类/独立')">另类/独立</li>
            <li class="tag" :class="{ actived: playlist.cat=='轻音乐' }" @click="changePlaylist('轻音乐')">轻音乐</li>
            <li class="tag" :class="{ actived: playlist.cat=='综艺' }" @click="changePlaylist('综艺')">综艺</li>
            <li class="tag" :class="{ actived: playlist.cat=='影视原声' }" @click="changePlaylist('影视原声')">影视原声</li>
            <li class="tag" :class="{ actived: playlist.cat=='ACG' }" @click="changePlaylist('ACG')">ACG</li>
        </ul>
    </div>
    <div style="margin-bottom:60px" v-loading="loading">
    <ul class="recommandList">
        <li class="recommandItem"  v-for="item in playlist.playlists" :key="item.id" @click="songList_view(item.id)">
            <img :src="item.coverImgUrl" alt="歌单封面">
            <div class="songList_info">{{ item.name }}</div>
            <div class="songList_views"><i class="iconfont icon-24gl-play"></i> {{ Math.ceil(item.playCount/10000) }}万
            </div>
            <div class="play-btn"><i class="iconfont icon-bofang" style="line-height:32px"></i></div>
        </li>
    </ul>
    <el-pagination @current-change="changePage" :page-size="50" :pager-count="11" layout="prev, pager, next" :total="parseInt(playlist.total)" background/>
    </div>
</div>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { getAllTags, getPlaylist, getHighQuality } from '../../api/playlist'
import {ref,onMounted} from 'vue';
import {useRouter} from 'vue-router';
let router = useRouter();
let loading = ref(true);
let showTags=ref(false);
let tags=ref([]);
let categories =ref({});
let playlist=ref({});
let highQuality=ref({});
let icon = ['icon-diqiuquanqiu', 'icon-fengge', 'icon-xiazai47 ', 'icon-smiling','icon-zhuti'];
async function getTags(){
    showTags.value = !showTags.value;
    const res= await getAllTags();
    categories.value=res.data.categories;
    for (let i in categories.value)
    {
        tags.value[i]=res.data.sub.filter((item)=>{
            return item.category==i;
        })
    }
}
onMounted(async ()=>{
    let res = await getPlaylist();
    playlist.value=res.data;
    let top =await getHighQuality();
    highQuality.value = top.data.playlists[0];
    loading.value=false;
})
function songList_view(id) {
    router.push({ name: 'songListDetail', query: { id, } });
}
async function changePlaylist(tag){
    loading.value=true;
    let res = await getPlaylist(50,'hot',tag);
    playlist.value = res.data;
    let top = await getHighQuality(1,tag);
    highQuality.value = top.data.playlists[0];
    loading.value = false;
}
async function changePage(val) {
    loading.value = true;
    let res = await getPlaylist(50, 'hot', playlist.value.cat, (val-1)*40);
    playlist.value = res.data;
    loading.value = false;
}
</script>

<style scoped>
.all-tags {
    position: absolute;
    color: #676767;
    width: 720px;
    top: 40px;
    left: 0px;
    background-color: #ffffff;
    z-index: 99;
    box-shadow: 0 0 8px #e5e5e5;
    border-radius: 4px;
    font-size: 14px;
    min-height: 400px;
}
.tags_title{
    padding-left:20px;
    line-height:80px;
    height:80px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
}
.tags_classes{
    display: flex;
    line-height: 26px;
    margin: 10px 0px 30px 0px;
}
.tags_classes ul{
    display: flex;
    flex-wrap: wrap;
    width: 500px;
}
.tags_left{
    width: 120px;
    height: 26px;
    color: #cfcfcf;
    margin: 0 40px 0 20px;
}
.tag{
    font-size:12px;
    padding: 0 10px;
    margin-right: 10px;
    height:26px;
    line-height:26px;
    text-align:center;
    cursor: pointer;
}
.tag:hover{
    color: #ec4141;
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
    position: relative;
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
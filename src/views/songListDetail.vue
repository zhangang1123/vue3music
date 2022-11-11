<template>
<div class="songlist_details">
  <div class="detail_header">
    <div class="detailImg">
        <img src="../assets/img/music.jpg" alt="">
    </div>
    <div class="songlist_info">
        <div class="info_title">
            <div class="tag">歌单</div>
            <span style="font-size:20px;font-weight: bold;margin-left:14px;">夜晚温柔粤语女声 唱出谁的不眠心事</span>
        </div>
        <div class="auther">
            <div class="auther_img">
                <img src="../assets/img/music.jpg" alt="">
            </div>
            <div class="auther-info">
                <span>YouTube全球音乐</span>
                <span style="margin-left:12px;font-size:12px">2018-01-06</span>
            </div>
        </div>
        <el-row class="mb-4">
            <el-button type="danger" :icon="VideoPlay" round>播放全部</el-button>
            <el-button class="none" :icon="FolderChecked"   round>收藏(21万)</el-button>
            <el-button class="none" :icon="Share"  round>分享(2517)</el-button>
            <el-button type="danger" :icon="HotWater"  round>加载完整歌单</el-button>
        </el-row>
        <div class="tags">
            <span>标签：</span>
            <span style="margin-right: 10px;">华语</span>
            <span style="margin-right: 10px;">粤语</span>
            <span style="margin-right: 10px;">流行</span>
        </div>
        <div class="tags">
            <span>歌曲：126</span>
            <span style="margin-left: 12px;">播放：226万</span>
        </div>
        <div class="introduce" :class="{showIntroduce,}">
            <p style="max-width: 1000px;">简介 ：人生总有许多巧合，两条平行线也可能会有交汇的一天。人生总有许多意外，握在手里面的风筝也会突然断了线。
            在这个熟悉又陌生的城市中，无助地寻找一个陌生又熟悉的身影。我有酒，你有故事吗。或许你只是缺一个愿意听你诉说你的故事那陌生又熟悉的身影。
            封面：张子枫</p>
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
        <li class="routeItem" @click="changeRoute('个性推荐')" :class="{ actived: currentPage =='个性推荐'}">歌曲列表</li>
        <li class="routeItem" @click="changeRoute('评论')" :class="{ actived: currentPage =='评论'}">评论(400)</li>
        <li class="routeItem" @click="changeRoute('收藏')" :class="{ actived: currentPage =='收藏'}">收藏</li>
    </ul>
    <div class="songlist">
        <el-table  :data="tableData" highlight-current-row :header-row-class-name="'table-header'">
            <el-table-column type="index" width="50" />
            <el-table-column label="音乐标题">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon>
                            <timer />
                        </el-icon>
                        <span style="margin-left: 10px">{{ scope.row.data}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column property="name" label="歌手"/>
            <el-table-column property="address" label="专辑" />
            <el-table-column property="time" label="时长" />
        </el-table>
    </div>
</div>
</template>

<script setup>
import { VideoPlay, Share, HotWater, FolderChecked, CaretBottom, CaretTop, Timer } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import { playlistDetail } from '../api/playlist';
import {ref} from 'vue';
const route=useRoute();
let showIntroduce=ref(false);
let currentPage = ref('个性推荐');
let tableData=[
    { data: '暗号', name: '周杰伦', address: '八度空间', time: '3:23' },
    {data:'暗号',name:'周杰伦',address:'八度空间',time:'3:23'},
    {data:'暗号',name:'周杰伦',address:'八度空间',time:'3:23'},
    {data:'暗号',name:'周杰伦',address:'八度空间',time:'3:23'},
    {data:'暗号',name:'周杰伦',address:'八度空间',time:'3:23'},
    { data: '暗号', name: '周杰伦', address: '八度空间', time: '3:23' },
]
function changeRoute(to)
{
    currentPage.value=to;
}
async function songlistDetail(id){
    const res=await playlistDetail(id);
    console.log(res);
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
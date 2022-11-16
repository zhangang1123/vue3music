<template>
  <div class="singer">
    <div class="tags">
        <div class="radio-list" >
            <div class="wh" >语种：</div>
            <ul>
                <li class="wh" style="margin-right:30px" :class="{isClicked: currentfilter.language =='-1'}" @click="changeArea('-1')">全部</li>
                <li class="wh" style="margin-right:30px" :class="{ isClicked: currentfilter.language =='7'}" @click="changeArea('7')">华语</li>
                <li class="wh" style="margin-right:30px" :class="{ isClicked: currentfilter.language =='9'}" @click="changeArea('9')">欧美</li>
                <li class="wh" style="margin-right:30px" :class="{ isClicked: currentfilter.language =='8'}" @click="changeArea('8')">日本</li>
                <li class="wh" style="margin-right:30px" :class="{ isClicked: currentfilter.language =='16'}" @click="changeArea('16')">韩国</li>
                <li class="wh" style="margin-right:30px" :class="{ isClicked: currentfilter.language =='0'}" @click="changeArea('0')">其他</li>
            </ul>
        </div>
        <div class="radio-list">
            <div class="wh">分类：</div>
            <ul>
                <li class="wh" style="margin-right:30px" :class="{ isClicked: currentfilter.class =='-1'}" @click="changeType('-1')">全部</li>
                <li class="wh" style="margin-right:30px" :class="{ isClicked: currentfilter.class =='1'}" @click="changeType('1')">男歌手</li>
                <li class="wh" style="margin-right:30px" :class="{ isClicked: currentfilter.class =='2'}" @click="changeType('2')">女歌手</li>
                <li class="wh" style="margin-right:30px" :class="{ isClicked: currentfilter.class =='3'}" @click="changeType('3')">乐队</li>
            </ul>
        </div>
        <div class="radio-list">
            <div class="wh" style="width:130px">筛选：</div>
            <ul>
                <li v-for="item in allfname" 
                @click="SingerList(item)"
                :key="item" class="wh" style="margin-right:30px" 
                :class="{isClicked:currentfilter.front==item}">
                {{item}}</li>
            </ul>
        </div>
    </div>
    <ul class="recommandList">
        <li class="recommandItem" v-for="singer in singerlist" :key="singer.id" @click="singer_view(singer.id)">
            <img :src="singer.img1v1Url" alt="歌手封面">
            <div class="songList_info">{{singer.name}}</div>
        </li>
    </ul>
  </div>
</template>

<script setup>
import {reactive,onMounted,ref} from 'vue';
import { getSingerList } from '../../api/list';
import {useRouter} from 'vue-router';
const router = useRouter();
let allfname=['全部','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'];
let currentfilter =reactive({language:'-1',class:'-1',front:'全部'});
let singerlist=ref([]);
async function SingerList(initial = currentfilter.front) {
    if (initial != currentfilter.front)
    {
        currentfilter.front=initial;
    }
    let s;
    if(initial=='全部')
    {
        s='-1';
    }else if(initial=='#')
    {
        s='0';
    }else{
        s=initial.toLowerCase();
    }
    const res = await getSingerList(currentfilter.class, currentfilter.language, s);
    singerlist.value = res.data.artists;
}
function changeType(type){
    if (currentfilter.class == type)
        return;
    currentfilter.class =type;
    SingerList();
}
function changeArea(area){
    if (currentfilter.language == area)
        return;
    currentfilter.language = area;
    SingerList();
}
function singer_view(id){
    router.push({ name: 'singerDetail',query: { id, }});
}
onMounted(async ()=>{
    const res = await getSingerList();
    singerlist.value = res.data.artists
})
</script>

<style scoped>
.singer{
    width:85%;
    margin:0 auto;
}
.radio-list{
    display: flex;
    line-height: 20px;
    margin-top: 10px;
}
.radio-list ul{
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
    /* padding-right: 10%; */
}
.wh{
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
}
.isClicked{
    color:#ec4141;
    background-color: #fdf5f5;
    border-radius: 15px;
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
<template>
  <div class="recommand">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in banners" :key="item.targetId">
        <img :src="item.imageUrl" alt="error" class="bannerImg">
      </el-carousel-item>
    </el-carousel>
    <div class="recommandBody">
      <h2 class="page-header">
        热门推荐
        <i class="iconfont icon-arrow-right"></i>
      </h2>
      <ul  class="recommandList">
        <li class="recommandItem" 
        @click="songList_view(item.id)"
        v-for="item in playlists" :key="item.id">
          <img :src="item.coverImgUrl" alt="歌单封面">
          <div class="songList_info">{{item.name}}</div>
          <div class="songList_views"><i class="iconfont icon-24gl-play"></i> {{ Math.floor(item.playCount/10000 )}}万
          </div>
          <div class="play-btn"><i class="iconfont icon-bofang" style="line-height:32px"></i></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { getBanners, dailyRecommand } from '../../api/homePage'
import { ref} from 'vue';
import {useRouter} from 'vue-router'
const router =useRouter();
let banners = ref([]);
let playlists = ref([]);
getBanners().then(res => {
  banners.value=res.data.banners;
})
dailyRecommand().then(res => {
  playlists.value=res.data.playlists;
})
function songList_view(id){
  router.push({name:'songListDetail',query:{id,}});
}
</script>

<style scoped>
.bannerImg{
  border-radius: 10px;
  width: 100%;
  height: 100%;
}
.play-btn{
    position: absolute;
    right: 15px;
    bottom: 45px;
    background-color: #fbf7f6;
    color: #ec4141;
    width: 32px;
    text-align: center;
    height: 32px;
    border-radius:50%;
    opacity: 0;
    transition: opacity 1s;
}
.recommandItem:hover .play-btn{
  opacity: 1;
}
.recommand{
  width: 1200px;
  margin: 0 auto;
}
.page-header{
  font-size:20px;
  font-weight: bold;
  cursor: pointer;
}
.recommandList{
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.recommandItem{
    position: relative;
    margin-bottom: 30px;
    width: 18%;
    margin-right: 2%;
    background-color:#fff;  
    cursor: pointer;
}
.recommandItem img{
  width: 100%;
  border-radius: 8px;
}
.songList_views{
  color: #ffffff;
  position: absolute;
  right: 10px;
  top: 10px;
  text-shadow: 0 0 2px #000;
}
.songList_info{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
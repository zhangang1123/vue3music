<template>
<div class="daily">
    <div class="info">
      <div class="img-wrap">
        <div class="day font-bold">14</div>
      </div>
      <div class="mleft-30 mtop-20">
        <div class="font-24 font-bold">每日歌曲推荐</div>
        <div style="color:#676767">根据你的音乐口味生成，每天6:00更新</div>
      </div>
    </div>
    <div  class="btn-wrap">
      <button  class="btn btn-red">
        <i class="iconfont icon-bofang"></i> 播放全部 
      </button>
      <button  class="btn btn-white mleft-12">
        <el-icon><FolderAdd /></el-icon> 收藏全部 
      </button>
    </div>
    <div class="line"></div>
    <songs/>
</div>
</template>

<script setup>
import { FolderAdd } from '@element-plus/icons-vue';
import songs from './songListDetail/songs.vue';
import { recommendSongs } from '../api/list';
import {reactive,provide} from 'vue';
let dailySongs=reactive({tracks:[]});
provide('songsDetails',dailySongs);
recommendSongs().then(res => {
  dailySongs.tracks.push(...res.data.data.dailySongs)
})
</script>

<style scoped>
.line{
  margin-top:20px;
  border-top: 1px solid #e0e0e0;
}
.daily{
    width:80%;
    margin:0 auto;
    margin-top:20px;
}
.info{
      display: flex;
}
.img-wrap .day{
  width: 100px;
  height: 40px;
  font-size: 40px;
  color: #ec4141;
  margin-top: 30px;
  text-align: center;
}
.img-wrap{
  height: 100px;
  width: 100px;
  background: url('../assets/img/daily.png') 0 0/100% no-repeat;
}
</style>
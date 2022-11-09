<template>
  <div class="recommand">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <img src="../../assets/img/login.jpg" alt="error">
      </el-carousel-item>
    </el-carousel>
    <div class="recommandBody">
      <h2 class="page-header">
        热门推荐
        <i class="iconfont icon-arrow-right"></i>
      </h2>
      <ul  class="recommandList">
        <li class="recommandItem" v-for="item in 10" :key="item">
          <img src="https://p2.music.126.net/dMlINUxUskjYg30JTRYexw==/19221662277102979.jpg?param=300y300" alt="歌单封面">
          <div class="songList_info">粤语女声：永远心仪</div>
          <div class="songList_views"><i class="iconfont icon-24gl-play"></i> 3704万
          </div>
          <div class="play-btn"><i class="iconfont icon-bofang" style="line-height:32px"></i></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
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
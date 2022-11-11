<template>
<div class="player">
    <div class="player-left">
        <img src="../assets/img/music.jpg" alt="songCover">
        <div class="musicInfo">
            <div style="font-size: 14px">Another Way</div>
            <div style="font-size: 12px">Au5</div>
        </div>
    </div>
    <div class="player-mid">
        <div class="play-btn">
            <button class="player-bar-btn">
                <i class="iconfont icon-liebiaoshunxu"></i>
            </button>
            <button class="player-bar-btn">
                <i class="iconfont icon-shangyishou"></i>
            </button>
            <button class="player-bar-btn">
                <i class="iconfont icon-zanting"></i>
                <!-- <i v-show="!isPlay" class="iconfont icon-bofang"></i> -->
            </button>
            <button class="player-bar-btn" >
                <i class="iconfont icon-xiayishou"></i>
            </button>
            <button class="player-bar-btn" >
                <i class="iconfont icon-aixin"></i>
                <!-- <i v-show="isLiked" style="color: #ec4141" class="iconfont icon-aixin1"></i> -->
            </button>
        </div>
        <div class="process-bar">
            <span>00:00</span>
            <div >
                <el-slider class="timeSlider" :debounce="500" :show-tooltip="false" />
            </div>
            <span>3:14</span>
        </div>
    </div>
    <div class="player-right">
        <div class="btn-other">
            <div class="dowmload">
                <el-icon size="30px" style="margin-right: 20px;cursor: pointer">
                    <Download />
                </el-icon>
            </div>
            <div class="volume">
                <div>
                    <i v-if="true" class="iconfont icon-shengyinguanbi volume-icon pointer"></i>
                    <i v-else class="iconfont icon-shengyin volume-icon pointer"></i>
                </div>
        
                <div class="volume-slider">
                    <el-slider  vertical height="200px"> </el-slider>
                </div>
            </div>
            <!-- 当前播放列表 -->
            <div class="curren-list" @click="showList=!showList">
                <i class="iconfont icon-liebiaoshunxu volume-icon pointer"></i>
            </div>
        </div>
        <el-drawer 
        title="正在播放"
        :append-to-body="true"
        v-model="showList">
            <el-table :data="tableData" highlight-current-row height="250" style="width: 100%">
                <el-table-column prop="name" label="name" width="180" />
                <el-table-column prop="songer" label="歌手" width="180" />
                <el-table-column prop="time" label="时长" />
            </el-table>
        </el-drawer>
    </div>
</div>
</template>

<script setup>
import { Download } from '@element-plus/icons-vue'
import { ref } from 'vue';
let showList=ref(false);
let tableData=[{name:'1',songer:'2',time:'2'}]
</script>

<style>
.timeSlider {
    width: 460px;
    margin: 0 10px;
}
.el-slider__bar {
    background-color: #ec4141;
    height: 3px;
}
.el-slider__button {
    border: 0;
    width: 9px;
    height: 9px;
    background-color: #e13e3e;
}
.process-bar{
    display: flex;
    line-height: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.player {
    position:fixed;
    width:100%;
    height:79px;
    background-color:#fff;
    bottom:0px;
    box-sizing: border-box;
    border-top: 1px solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.player-left{
    height:50px;
    display: flex;
    align-items: center;
    position: relative;
    width: 300px;
}
.player-left img{
    margin: 0 10px;
    height: 50px;
    width: 50px;
    border-radius: 8px;
    box-sizing: border-box;
    border: 1px solid #dddddd;
}
.play-btn{
    display: flex;
    width: 300px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    margin-top: 6px;
    justify-content: space-around;
}
.player-bar-btn {
    outline: none;
    border: none;
    background-color: #fff;
    cursor: pointer;
    padding: 1px 6px;
}

.player-bar-btn .iconfont {
    font-size: 18px;
}

.player-bar-btn:nth-child(3) {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: center;
}

.player-bar-btn:nth-child(3) .iconfont {
    font-size: 16px;
}

.player-bar-btn:hover {
    color: red;
}

.player-bar-btn:nth-child(3):hover {
    background-color: #e5e5e5;
}
.btn-other {
  display: flex;
  width: 300px;
  justify-content: flex-end;
}
/* 音量图标 */
.volume-icon {
  font-size: 30px;
}
.volume {
  position: relative;
  margin-right: 20px;
}
.volume .volume-slider {
  display: none;
  position: absolute;
  top: -220px;
  left: -3px;
  background-color: #ffffff;
  padding: 10px 0;
  border-radius: 5px;
  box-shadow: 0 0 10px #bbbbbb;
}
.volume:hover .volume-slider {
  display: block;
}

</style>
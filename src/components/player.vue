<template>
<div class="player">
    <div class="player-left">
        <img :src="songInfo.cover" alt="songCover" @click="showDetails()">
        <div class="musicInfo">
            <div style="font-size: 14px">{{ songInfo.name}}</div>
            <div style="font-size: 12px">{{ songInfo.ar}}</div>
        </div>
    </div>
    <div class="player-mid">
        <div class="play-btn">
            <button class="player-bar-btn">
                <i class="iconfont icon-liebiaoshunxu"></i>
            </button>
            <button class="player-bar-btn" @click="changeSong(false)" :disabled="!store.state.songPlaying">
                <i class="iconfont icon-shangyishou"></i>
            </button>
            <button class="player-bar-btn" @click="changePlaying" :disabled="!store.state.songPlaying">
                <i v-show="store.state.isPlay" class="iconfont icon-zanting"></i>
                <i v-show="!store.state.isPlay" class="iconfont icon-bofang"></i>
            </button>
            <button class="player-bar-btn" @click="changeSong(true)" :disabled="!store.state.songPlaying">
                <i class="iconfont icon-xiayishou"></i>
            </button>
            <button class="player-bar-btn" v-login :disabled="!store.state.songPlaying">
                <i v-if="store.state.likeList.indexOf(songInfo.id)==-1" class="iconfont icon-aixin" @click.stop="givelike(songInfo.id,true)"></i>
                <i v-else style="color: #ec4141" class="iconfont icon-aixin1" @click.stop="givelike(songInfo.id,false)"></i>
            </button>
        </div>
        <div class="process-bar">
            <span>{{ currentShowTime }}</span>
            <div >
                <el-slider v-model="currentPos" class="timeSlider" :debounce="300" :show-tooltip="false" />
            </div>
            <span>{{ songInfo.duration??'00:00' }}</span>
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
                    <i v-if="volume==0" class="iconfont icon-shengyinguanbi volume-icon pointer"></i>
                    <i v-else class="iconfont icon-shengyin volume-icon pointer"></i>
                </div>
        
                <div class="volume-slider">
                    <el-slider v-model="volume" vertical height="200px"> </el-slider>
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
            <el-table :data="playlist" @row-click="playSong" highlight-current-row  style="width: 100%" empty-text = "当前没有音乐哦~">
                <el-table-column prop="name" label="name" width="180" />
                <el-table-column prop="ar[0].name" label="歌手" width="180" />
                <el-table-column prop="dt" :formatter="formatTime" label="时长" />
            </el-table>
        </el-drawer>
        <el-drawer :append-to-body="true" v-model="showSongDetails" direction="btt" size="100%" :show-close="false" :with-header="false">
            <header id="el-drawer__title" class="el-drawer__header">
                <div @click="showDetails"><el-icon><ArrowDown /></el-icon></div>
            </header>
                <div class="play-view">
                    <div style="font-size:30px;text-align: center;">{{ songInfo.name}}</div>
                    <div style="text-align: center;">{{ songInfo.ar}}</div>
                    <div style="display: flex;">
                        <div class="song_img">
                            <div class="play" @click="changePlaying" :class="{ isPlay: store.state.isPlay }">
                                <img src="../assets/img/play.png" alt="player">
                            </div>
                            <div class="changpian">
                                <div class="changpian-wrap" @click="changePlaying">
                                    <img :src="songInfo.cover">
                                </div>
                            </div>
                        </div>
                        <lyricwrap />
                    </div>
                </div>
                <comment type="music" style="width:75%;margin:0 auto;"/>
        </el-drawer>
    </div>
    <audio ref="audio" loop :src="songInfo.url" autoplay="autoplay"></audio>
</div>
</template>

<script setup>
import comment from '../views/songListDetail/comment.vue';
import lyricwrap from './lyricwrap.vue'
import { Download, ArrowDown } from '@element-plus/icons-vue';
import {useStore} from 'vuex';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { getSongDetails } from "../api/playlist"; 
import { likeSong } from '../api/handle';
let time;
const store = useStore();
let showList=ref(false);
let showSongDetails=ref(false);
let audio=ref(null);
let currentTime=computed({
    get(){
        return store.state.currentTime;
    },
    set(val){
        store.state.currentTime=val;
    }
});
let currentVolume=ref(100);
let songInfo=computed(()=>{
    if (!store.state.songPlaying)
    {
        return { id:-1 ,name: '未知音乐', ar: "未知歌手", cover: require('../assets/img/music.jpg'),url:''};
    }else{
        return store.state.songPlaying;
    }
});
let currentShowTime=computed(()=>{
    let m = (Math.floor(currentTime.value / 60) < 10 ? '0' + Math.floor(currentTime.value / 60) : Math.floor(currentTime.value / 60)) + ':';
    let s = Math.floor(currentTime.value % 60) < 10 ? '0' + Math.floor(currentTime.value % 60) : Math.floor(currentTime.value % 60);
    return m+s;
})
onMounted(()=>{
    currentTime.value = audio.value.currentTime;
    time=setInterval(()=>{
        currentTime.value = audio.value.currentTime;
    },1000);
});
onBeforeUnmount(()=>{
    clearInterval(time);
})
let currentPos=computed({
    get(){
        if(audio.value!=null)
        {
            return Math.floor((currentTime.value * 100) / audio.value.duration);
        }
    },
    set(val){
        audio.value.currentTime = (val * audio.value.duration)/100
    }
})
function showDetails(){
    if (!store.state.songPlaying)
        return;
    showSongDetails.value = !showSongDetails.value;
}
function changePlaying()
{
    store.state.isPlay ? audio.value.pause() : audio.value.play();
    store.state.isPlay=!store.state.isPlay;
}
function changeSong(flag){
    let current = -1;
    for (let i in playlist.value) {
        if (playlist.value[i].id == songInfo.value.id) {
            current = i;
        }
    }
    let len=playlist.value.length;
    if(flag)
    {
        if(current !=len-1)
        {
            current++;
            playSong({ id: playlist.value[current].id })
        }else{
            ElMessage({
                message: '已经是最后一首了   ',
                type: 'warning',
            })
        }
    }else{
        if (current != 0) {
            current--;
            playSong({ id: playlist.value[current].id });
        }else{
            ElMessage({
                message: '已经到头了    ',
                type: 'warning',
            })
        }
    }
}
let volume = computed({
    get(){
        if (audio.value != null) {
            return currentVolume.value;
        }
    },
    set(val){
        audio.value.volume=val/100;
        currentVolume.value=val;
    }
})
let playlist=computed(()=>{
    return store.state.playlist.tracks;
})
function formatTime(row) {
    let date = new Date(row.dt)
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return m + s;
}
async function playSong(row){
    console.log(row, formatTime(row));
    const res = await getSongDetails(row.id);
    let songInfo = {
        id: res.data.songs[0].id, name: res.data.songs[0].name, duration: formatTime(row),
        cover: res.data.songs[0].al.picUrl, ar: res.data.songs[0].ar[0].name, url: '', alname: res.data.songs[0].al.name
    }
    store.dispatch('changeSong', { id: row.id, songInfo });
}
async function givelike(id, like) {
    console.log(id, like);
    const res = await likeSong(id, like);
    if (res.data.code == 200) {
        if (like) {
            store.state.likeList.push(id);
            ElMessage({
                message: '喜欢成功',
                type: 'success',
            })
        } else {
            store.state.likeList = store.state.likeList.filter(item => {
                return item != id;
            })
            ElMessage({
                message: '取消喜欢成功',
                type: 'success',
            })
        }
    }
}
</script>

<style>

.timeSlider {
    width: 460px;
    margin: 0 10px;
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
    z-index: 1000;
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
.song_img {
    margin-top: 10px;
    position: relative;
}

.play {
    position: absolute;
    top: -30px;
    left: 130px;
    width: 120px;
    transform-origin: 3px 3px;
    transition: all 0.5s;
    z-index: 20;
}
.isPlay{
    transform: rotate(30deg);
}

.play-view {
    width: 100%;
    margin: 0 auto;
    padding: 0 20%;
}

.changpian {
    margin-top: 40px;
    margin-right: 0;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background-color: #c4c3c6;
    display: flex;
    justify-content: center;
    align-items: center;
}

.changpian-wrap {
    width: 240px;
    height: 240px;
    background-color: #1a1c1e;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.changpian-wrap img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
}
</style>
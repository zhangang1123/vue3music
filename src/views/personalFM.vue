<template>
<div class="personal">
    <div class="song_Info">
        <div class="Info-left">
            <div class="song_img">
                <img :src="songInfo.picUrl" alt="personalFMerror">
                <div class="play-btn"  @click="playSong()">
                    <i class="iconfont icon-bofang" v-show="!store.state.isPlay"></i>
                    <i class="iconfont icon-zanting" v-show="store.state.isPlay"></i>
                </div>
            </div>
            <div class="btn_group">
                <button class="pfm-btn" v-login>
                    <i v-if="store.state.likeList.indexOf(songInfo.id)==-1" class="iconfont icon-aixin" @click.stop="givelike(songInfo.id,true)"></i>
                    <i v-else class="iconfont icon-aixin1" style="color: red;" @click.stop="givelike(songInfo.id,false)"></i>
                </button>
                <el-popconfirm title="确定将当前音乐移到垃圾桶吗？" @confirm="deleteFromFM()">
                    <template #reference>
                        <button class="pfm-btn">
                            <el-icon><Delete /></el-icon>
                        </button>
                    </template>
                </el-popconfirm>
                <button class="pfm-btn">
                    <el-icon><CaretRight @click="getFM()"/></el-icon>
                </button>
                <button class="pfm-btn">
                    <el-icon><MoreFilled /></el-icon>
                </button>
            </div>
        </div>
        <div class="Info-right">
            <div><span class="font-24">{{songInfo.name}}</span></div>
            <div style="margin-top:10px;">
                <div class="font-12"> 专辑：<span style="color: #5d86b5;cursor:pointer">{{ songInfo.album.name }}</span></div>
                <div class="font-12"> 歌手：<span style="color: #5d86b5;cursor:pointer">{{ songInfo.author.name}}</span></div>
            </div>
        <lyricwrap type="FM" :songId="songInfo.id"/>
        </div>
    </div>
    <comment type="FM" :songId="songInfo.id"/>
</div>
</template>

<script setup>
import lyricwrap from '../components/lyricwrap.vue';
import comment from './songListDetail/comment.vue';
import { Delete, CaretRight, MoreFilled } from '@element-plus/icons-vue';
import { getPersonal } from '../api/list';
import { getSongDetails } from '../api/playlist';
import { deletefromFM, likeSong } from '../api/handle.js'
import {useRoute} from 'vue-router';
import {useStore} from 'vuex';
import { ref, computed } from 'vue';
const store = useStore();
const route = useRoute();
let songInfo = ref(JSON.parse(route.query.songInfo))
function formatTime(dt) {
    let date = new Date(dt)
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return m + s;
}
async function playSong() {
    const res = await getSongDetails(songInfo.value.id);
    let temp = {
        id: res.data.songs[0].id, name: res.data.songs[0].name, duration: formatTime(songInfo.value.duration),
        cover: res.data.songs[0].al.picUrl, ar: res.data.songs[0].ar[0].name, url: '', alname: res.data.songs[0].al.name
    }
    store.dispatch('changeSong', { id: songInfo.value.id, songInfo: temp });
}
async function getFM() {
    const res = await getPersonal();
    let Info = { duration: res.data.data[0].duration, id: res.data.data[0].id, picUrl: res.data.data[0].album.blurPicUrl, name: res.data.data[0].name, album: { name: res.data.data[0].album.name, id: res.data.data[0].album.id }, author: { id: res.data.data[0].artists[0].id, name: res.data.data[0].artists[0].name } }
    songInfo.value = Info;
}
async function deleteFromFM(){
    deletefromFM(songInfo.value.id).then(res=>{
        if(res.data.code== 200);
        {
            ElMessage({
                message: '删除成功',
                type: 'success',
            });
            getFM();
        }
    })
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

<style scoped>
.pfm-btn{
    outline: none;
    border: 1px solid #e7e7e7;
    background-color: #fff;
    color: #8c8c8c;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    cursor: pointer;
    font-size:20px;
}
.btn_group{
    display: flex;
    justify-content: space-between;
    margin-top:20px;
}
.personal{
    margin-top:20px;
    margin:0 auto;
    width:70%;
}
.song_Info{
    display:flex;
}
.Info-left{
    margin-top:120px;
}
.Info-right{
    margin-left: 30px;
}
.song_img{
    position: relative;
    box-sizing: border-box;
    border: 1px solid #eeeeee;
    height: 260px;
    width: 260px;
}
.song_img:hover .play-btn{
    opacity: 1;
}
.song_img img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
}
.play-btn {
    cursor: pointer;
    position: absolute;
    background-color: #fbf7f6;
    color: #ec4141;
    width: 40px;
    text-align: center;
    height: 40px;
    border-radius: 50%;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    opacity: 0;
    transition: opacity 1s;
}
/* .song_Info */
</style>
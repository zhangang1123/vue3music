<template>
<div class="songlist">
    <el-table :data="songsDetails.tracks ?? []" 
    @row-click="playSong"
    v-throttle
    highlight-current-row empty-text = "当前没有音乐哦~">
        <el-table-column type="index" width="50" />
        <el-table-column label="音乐标题">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <i v-login class="iconfont icon-aixin"></i>
                    <i v-show="false" v-login class="iconfont icon-aixin1" style="color: rgb(236, 65, 65);"></i>
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column property="ar[0].name" label="歌手" />
        <el-table-column property="al.name" label="专辑" />
        <el-table-column property="dt" :formatter="formatTime" label="时长" />
    </el-table>
</div>
</template>

<script setup>
import {inject} from 'vue';
import {useStore} from 'vuex';
import { getSongDetails } from '../../api/playlist';
import { likeSong } from '../../api/handle';
const store = useStore();
let songsDetails = inject('songsDetails');
console.log(songsDetails);
function formatTime(row) {
    let date = new Date(row.dt)
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return m + s;
}
async function playSong(row) {
    const res = await getSongDetails(row.id);
    let songInfo = { id: res.data.songs[0].id, name: res.data.songs[0].name,duration: formatTime(row),
        cover: res.data.songs[0].al.picUrl, ar: res.data.songs[0].ar[0].name,url:'',alname: res.data.songs[0].al.name}
    store.dispatch('changeSong',{id:row.id,songInfo});
    store.commit('changePlaylist', songsDetails);
}
// async function givelike(){
//     const res = await likeSong();
//     console.log(res.data); 
// }
</script>

<style scoped>
.iconfont{
    cursor: pointer;
}
.songlist{
    margin-bottom: 70px;
}
</style>
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
                    <i v-if="store.state.likeList.indexOf(scope.row.id)==-1" v-login class="iconfont icon-aixin" @click.stop="givelike(scope.row.id,true)"></i>
                    <i v-else v-login class="iconfont icon-aixin1" style="color: rgb(236, 65, 65);" @click.stop="givelike(scope.row.id,false)"></i>
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
async function givelike(id,like){
    console.log(id,like);
    const res = await likeSong(id,like);
    if(res.data.code==200)
    {
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
    console.log(store.state.likeList);
    console.log(res.data); 
}
</script>

<style scoped>
.iconfont{
    cursor: pointer;
}
.songlist{
    margin-bottom: 70px;
}
</style>
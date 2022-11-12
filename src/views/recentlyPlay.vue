<template>
  <div class="histroy">
    <div class="info">
        <div>
            <span style="font-size:24px;font-weight: bold">最近播放</span>
            <span style="margin-left:10px;font-size:14px;">共 {{ store.state.historylist.length}} 首</span>
        </div>
        <div style="cursor: pointer;" @click="clearHistroy()">清除列表</div>
    </div>
    <button class="play_all">
    <i class="iconfont icon-bofang"></i>
        播放全部
    </button>
    <div style="border-top: 1px solid #e0e0e0;"></div>
    <el-table :data="store.state.historylist"  
        @row-click="playSong"
        highlight-current-row
        empty-text = "当前没有音乐哦~">
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
        <el-table-column property="ar" label="歌手" />
        <el-table-column property="alname" label="专辑" />
        <el-table-column property="duration" label="时长" />
    </el-table>
  </div>
</template>

<script setup>
import {useStore} from 'vuex';
let store = useStore();
function clearHistroy(){
    sessionStorage.clear();
    store.state.historylist=[];
}
function playSong(row) {
    store.commit('playSong',row);
}
</script>

<style scoped>
.histroy {
    margin: 0 auto;
    margin-top: 20px;
    width: 80%;
}
.info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.play_all{
    margin-top: 10px;
    margin-bottom: 20px;
    border: none;
    outline: none;
    height: 30px;
    padding: 4px 14px;
    border-radius: 15px;
    cursor: pointer;
    background-color: #ec4141;
    color: #fff;
}
</style>
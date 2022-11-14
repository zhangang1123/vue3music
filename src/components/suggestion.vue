<template>
<div class="suggestion">
    <div class="title">热搜榜</div>
    <ul class="hot-list">
        <li class="hot-item" v-for="(item,index) in suggestionList" :key="index" @click.stop="searchThis(item.searchWord)">
            <div class="item-index"  :style="{color:index<3?'red':'rgb(153, 153, 153)'}">{{index+1}}</div>
            <div class="item-info">
                <div style="margin-top:8px;">
                    <span class="font-12 item-key">{{ item.searchWord }}</span>
                    <span class="font-12 mleft-10" style="color: rgb(194, 193, 193);">{{ item.score }}</span>
                </div>
                <div>
                    <span class="font-12" style="color: rgb(153, 153, 153);">{{ item.content }}</span>
                </div>
            </div>
        </li>
    </ul>
</div>
</template>

<script setup>
import { searchHot } from '../api/list';
import {ref} from 'vue';
import {useRouter} from 'vue-router';
let router = useRouter();
let suggestionList=ref([]);
searchHot().then(res=>{
    suggestionList.value=res.data.data;
})
function searchThis(val) {
    router.push({ name: 'searchList', query: { keywords: val } });
}
</script>

<style>
.suggestion {
    position: absolute;
    width: 340px;
    height: 420px;
    border-radius: 10px;
    /* margin-top: 20px; */
    background-color: #fff;
    box-shadow: 0 1px 4px #dddddd;
    color: #000;
    overflow: auto;
    z-index: 1000;
}

.hot-item {
    width: 100%;
    height: 50px;
    display: flex;
    cursor: pointer;
}

.hot-item:hover {
    background-color: #f2f2f2;
}

.item-index {
    width: 40px;
    text-align: center;
    line-height: 50px;
}
.title {
    font-size: 14px;
    margin: 10px 0 10px 10px;
}
</style>
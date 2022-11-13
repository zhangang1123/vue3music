<template>
  <div class="find-header">
    <ul class="routeList" @click="changeRoute($event)">
        <li class="routeItem" :class="{ actived: route.name =='recommandBySelf'}">个性推荐</li>
        <li class="routeItem" :class="{ actived: route.name =='songList'}">歌单</li>
        <li class="routeItem" :class="{ actived: route.name =='charts'}">排行榜</li>
        <li class="routeItem" :class="{ actived: route.name =='singer'}">歌手</li>
        <li class="routeItem" :class="{ actived: route.name =='latestMusic'}">最新音乐</li>
    </ul>
  </div>
  <router-view></router-view>
</template>

<script setup>
import {ref} from "vue";
import {useRouter,useRoute} from 'vue-router';
let router = useRouter();
let route = useRoute();
function changeRoute(e)
{
    switch (e.target.innerText)
    {
        case '个性推荐': {
            router.push({ name: 'recommandBySelf' })
            break;
        }
        case '歌单': {
            router.push({name: 'songList'})
            break;
        }
        case '排行榜': {
            router.push({ name: 'charts' })
            break;
        }
        case '歌手':{
            router.push({ name: 'singer'});
            break;
        }
        case '最新音乐':{
            router.push({ name: 'latestMusic' });
            break;
        }
    }
}
</script>

<style scoped>
/* .find-header{
    height:90px ;
} */
.routeList{
    /* position: fixed; */
    display:flex;
    font-size:14px;
    cursor: pointer;
}
.routeItem{
    margin:10px;
}
.actived{
    font-size: 18px;
    font-weight: bold;
    color: #2c3e50;
}
.actived::after{
    display: block;
    content: '';
    height: 4px;
    width: 90%;
    margin: 0 auto;
    background-color: #ec4141;
    border-radius: 2px;
}
</style>
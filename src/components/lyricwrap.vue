<template>

<div class="lyrics">
    <div ref="dom">
        <p class="text-hidden" v-for="(item,index) in lyric" :key="item.time" :class="{ lyric_active: lyricIndex==index }"> {{item.text}} </p>
    </div>
</div>
</template>

<script setup>
import { getlyric } from '../api/list';
import {reactive,ref,watch} from 'vue';
import {useStore} from 'vuex';
const store= useStore();
let lyricIndex = ref(0);
let lyric=reactive([]);
let dom=ref(null);
let id;
let prop = defineProps(['type','songId'])
if(prop.type=='FM')
{
    id=prop.songId;
    watch(() => prop.songId,(val)=>{
        init(val);
    })
}else{
    id =store.state.songPlaying.id;
}
watch(()=>store.state.currentTime,(newval)=>{
    for(let item in lyric)
    {
        if(lyric[item].time==Math.floor(newval)){
            lyricIndex.value=item;
            dom.value.style.transform = `translateY(-${40 * item / 37.5}rem)`
        }
    }
})
function init(id) {
    lyric.length=0;
    getlyric(id).then(res => {
        let arr = res.data.lrc.lyric.split('\n');
        let row = arr.length; //获取歌词行数
        for (let i = 0; i < row; i++) {
            let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
            let temp_arr = temp_row.split("]");//我们可以通过“]”对时间和文本进行分离
            let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
            //再对剩下的歌词时间进行处理
            temp_arr.forEach(element => {
                let obj = {};
                let time_arr = element.substr(1, element.length - 1).split(":");//先把多余的“[”去掉，再分离出分、秒
                let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
                obj.time = s;
                obj.text = text;
                lyric.push(obj); //每一行歌词对象存到组件的lyric歌词属性里
            });
        }
    })
}
init(id);
</script>

<style>
.lyric_active{
    font-weight: bold;
    font-size: 15px;
    color: rgb(207, 32, 32);
}
.text-hidden {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.lyrics {
    width: 600px;
    height: 400px;
    overflow-y: scroll;
    scrollbar-width: thin;
    margin: 40px 0 0 20px;
    color: #666666;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
}
</style>
<template>
<div class="comment">
    <div style="position: relative;">
        <textarea class="text-area" v-model="context"></textarea>
        <div class="word-num">140</div>
    </div>
    <div class="btn-wrap mtop-10">
        <div class="at-btn">
            <button class="char no-btn" @click="context+='@'"> @ </button>
            <button class="char no-btn" @click="context+='#输入你想说的话题#'">#</button></div>
        <div class="send-btn">
            <button class="btn btn-white" v-login @click="sendComment()">评论</button>
        </div>
    </div>
    <div class="hot_comment">
        <div class="font-16 font-bold">最新评论({{ total }})</div>
        <div class="comment_item" v-for="(item,index) in comments" :key="item.commentId">
            <div class="comment_main">
                <div class="img-wrap">
                    <img class="img circle pointer" :src="item.user.avatarUrl">
                </div>
                <div class="comment_left">
                    <div class="comment-content">
                        <span class="font-12 pointer" style="color: rgb(80, 125, 175);">{{ item.user.nickname }}：</span>
                        <span  class="font-12">{{ item.content }}</span>
                    </div>
                    <div class="reply-content" v-for="comment in item.beReplied" :key="comment.beRepliedCommentId">
                            <span class="font-12 pointer" style="margin-left: 5px; color: rgb(80, 125, 175);"> @{{ comment.user.nickname}}：</span>
                            <span class="font-12">{{ comment.content}}</span>
                    </div>
                    <div class="comment_Info">
                        <div class="time font-12" style="color: rgb(159, 159, 159);"> {{ item.timeStr }} </div>
                        <div class="comment-btn">
                            <button class="no-btn" v-login @click="giveLike(item,index)">
                                <i class="iconfont icon-good" :style="{ color: item.liked&&'red' }"></i>
                                <span > {{ item.likedCount }}</span>
                            </button>
                            <div  class="div-column"></div>
                            <button  class="no-btn" v-login>
                                <i class="iconfont icon-fenxiang"></i>
                            </button>
                            <div  class="div-column"></div>
                            <button  class="no-btn" v-login @click="replyComment(item)">
                                <i class="iconfont icon-pinglun"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="line"></div>
    </div>
    <el-pagination background layout="prev, pager, next" :page-size="30" :total="total" @current-change="nextPages"/>
</div>
</template>

<script setup>
import { getComments, getMusicComment } from '../../api/list';
import { addComment, likeComment } from '../../api/handle.js';
import { inject, onMounted, ref, watch } from 'vue';
import {useStore} from 'vuex';
let songsDetails
let store= useStore();
let context = ref('');
let total = ref(0);
let comments = ref([]);
let replyObj=ref({});
let prop=defineProps({
    type:{
        type:String,
        default() {
            return 'playlist'
        }
    }, 
    songId:{},
})
if(prop.type=='playlist')
{
    songsDetails = inject('songsDetails');
}else if(prop.type=='FM')
{
    watch(() =>prop.songId,()=>{
        init();
    })
}
async function nextPages(val)
{
    let res;
    if (prop.type == 'playlist') {
        res = await getComments(songsDetails.value.id, 30, (val-1)*30);
    } else if (prop.type == 'music') {
        res = await getMusicComment(store.state.songPlaying.id ,30, (val - 1) * 30);
    } else if (prop.type == 'FM') {
        res = await getMusicComment(prop.songId,30, (val - 1) * 30);
    }
    comments.value = res.data.comments;
}
async function init(){
    let res;
    if (prop.type == 'playlist') {
        res = await getComments(songsDetails.value.id, 30, 0);
    } else if (prop.type == 'music') {
        res = await getMusicComment(store.state.songPlaying.id);
    } else if (prop.type == 'FM') {
        res = await getMusicComment(prop.songId);
    }
    total.value = res.data.total;
    comments.value = res.data.comments;
}
async function sendComment(){
    let type=0,id;
    if(prop.type == 'playlist') {
        type=2;
        id = songsDetails.value.id;
    }else if(prop.type == 'music'){
        type=0;
        id = store.state.songPlaying.id;
    }else if(prop.type == 'FM'){
        type = 0;
        id = prop.songId;
    } 
    if (context.value.slice(0, 2) == '回复' && replyObj.value.user)
    {
        let len =replyObj.value.user.nickname.length;
        let content=context.value.slice(len+3);
        const res = await addComment(2, type, id, content, replyObj.value.commentId);
        let temp = res.data.comment;
        temp.beReplied = [replyObj.value];
        comments.value.unshift(temp);
        ElMessage({
            message: '评论成功',
            type: 'success',
        });
        context.value='';
    }
    else{
        const res = await addComment(1, type, id, context.value);
        if (res.data.code == 200) {
            ElMessage({
                message: '评论成功',
                type: 'success',
            });
            comments.value.unshift(res.data.comment);
            context.value = '';
        }
    }
}
async function giveLike(item,index){
    let type,t=0,id;
    item.isliked?t=0:t=1;
    if (prop.type == 'playlist')
    {
        id = songsDetails.value.id;
        type=2;
    }
    const res = await likeComment(id,item.commentId,t,type);
    if(res.data.code==200)
    {
        comments.value[index].isliked = !comments.value[index].isliked;
    }
}
async function replyComment(item){
    context.value=`回复${item.user.nickname}：`;
    replyObj.value = item;
}
onMounted(()=>{
    init();
})
</script>

<style scoped>
.line{
    border-top: 1px solid #e0e0e0;
}
.no-btn{
    padding:1px 6px;
}
.div-column{
    display: inline-block;
    width: 1px;
    height: 14px;
    background-color: #dfcfe7;
}
.comment_Info{
    display: flex;
    justify-content: space-between;
}
.comment_main .comment-left .comment-content{
    word-break: break-all;
    word-wrap: break-word;
    display: flex;
    justify-content: space-between;
}
.reply-content{
    background-color: #f4f4f4;
    border-radius: 6px;
    word-break: break-all;
    word-wrap: break-word;
}
.comment_left {
    line-height: 30px;
    flex: 1;
    margin-left:10px;
}
.img-wrap {
    height: 40px;
    width: 40px;
}
.comment_main{
    display: flex;
    align-items: center;
    margin: 10px 0;
}
.hot_comment{
    margin-top: 20px;
}
.char{
    padding: 1px 6px;
    font-size: 18px;
}
.btn-wrap{
        display: flex;
        align-items: center;
        justify-content: space-between;
}
.text-area {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    border: 1px solid #e5e5e5;
    outline: none;
    font-size: 14px;
    border-radius: 4px;
    padding: 4px 10px;
    resize: none;
    word-break: break-all;
    word-wrap: break-word;
}
.word-num{
    position: absolute;
    bottom: 4px;
    right: 4px;
    color: #dfcfdf;
}
.comment{
    margin-bottom: 100px;
}
</style>
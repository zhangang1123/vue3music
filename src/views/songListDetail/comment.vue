<template>
<div class="comment">
    <div style="position: relative;">
        <textarea class="text-area"></textarea>
        <div class="word-num">140</div>
    </div>
    <div class="btn-wrap mtop-10">
        <div class="at-btn">
            <button class="char no-btn"> @ </button>
            <button class="char no-btn">#</button></div>
        <div class="send-btn">
            <button class="btn btn-white">评论</button>
        </div>
    </div>
    <div class="hot_comment">
        <div class="font-16 font-bold">最新评论(28)</div>
        <div class="comment_item">
            <div class="comment_main">
                <div class="img-wrap">
                    <img class="img circle pointer" src="../../assets/img/music.jpg">
                </div>
                <div class="comment_left">
                    <div class="comment-content">
                        <span class="font-12 pointer" style="color: rgb(80, 125, 175);">柃牟：</span>
                        <span  class="font-12">求封面</span>
                    </div>
                    <div class="comment_Info">
                        <div class="time font-12" style="color: rgb(159, 159, 159);"> 3天前 </div>
                        <div class="comment-btn">
                            <button class="no-btn">
                                <i class="iconfont icon-good"></i>
                                <span > 0</span>
                            </button>
                            <div  class="div-column"></div>
                            <button  class="no-btn">
                                <i class="iconfont icon-fenxiang"></i>
                            </button>
                            <div  class="div-column"></div>
                            <button  class="no-btn">
                                <i class="iconfont icon-pinglun"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="line"></div>
    </div>
</div>
</template>

<script setup>

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
</style>
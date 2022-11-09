<template>
<div class="suggestion">
    <div class="title">热搜榜</div>
    <ul class="hot-list">
        <li class="hot-item">
            <div class="item-index">1</div>
            <div class="item-info">
                <div style="margin-top:8px;">
                    <span class="font-12 item-key">林俊杰</span>
                    <span class="font-12 mleft-10" style="color: rgb(194, 193, 193);">20417</span>
                </div>
                <div>
                    <span class="font-12" style="color: rgb(153, 153, 153);">看看行走的CD机又发什么新歌啦~</span>
                </div>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
export default {

}
</script>

<style>
.suggestion {
    position: absolute;
    width: 340px;
    height: 420px;
    border-radius: 10px;
    margin-top: 20px;
    background-color: #fff;
    border: 1px solid rgb(200, 194, 194);
    box-shadow: 0 1px 4px #dddddd;
    color: #000;
    overflow: auto;
}

.hot-item {
    width: 100%;
    height: 50px;
    display: flex;
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
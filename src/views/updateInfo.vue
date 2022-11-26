<template>
<div class="box" @click="showDragBox = false">
    <div class="font-20 font-bold">编辑个人信息</div>
    <div class="myInfo">
        <div class="edit_info mtop-20">
            <el-form label-position="right" style="width: 500px">
                <el-form-item label="昵称：">
                    <el-input v-model="info.nickname"/>
                </el-form-item>
                <el-form-item label="介绍：">
                    <el-input type="textarea" v-model="info.signature"/>
                </el-form-item>
                <el-form-item label="性别：">
                    <el-radio-group v-model="info.gender" label="label position">
                        <el-radio-button label="0">保密</el-radio-button>
                        <el-radio-button label="1">男</el-radio-button>
                        <el-radio-button label="2">女</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="生日：">
                    <el-date-picker type="date" placeholder="选择日期" size="small" v-model="birthday"/>
                </el-form-item>
            </el-form>
            <div class="edit-img-container">
                <div>
                    <div class="img-wrap">
                        <img :src="info.avatarUrl" class="edit-img" @click.stop="uploadDrag()">
                        <span style="font-size:10px;color:#606266">点击修改头像上传图片，点击图片可以托拽上传</span>
                    </div>
                    <div class="btn-wrap">
                                <button class="btn btn-white" @click="clickFile()">修改头像</button>
                                <input ref="uploadDom" type="file" name="file" accept="image/*" style="opacity:0" @change="clickUpload()">
                    </div>
                </div>
            </div>
        </div>
        <div class="submit-wrap">
            <button class="btn btn-red" @click="update()">保存</button>
            <button class="btn btn-white mleft-20" @click="router.go(-1)">取消</button>
        </div>
    </div>
    <div class="dragUpload" v-show="showDragBox" @dragleave.prevent="leave($event)" @drop.prevent="dragEnd($event)">
        将文件托到这儿上传
    </div>
</div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, ref, onMounted } from 'vue';
import { updateInfo, updateAvatar } from '../api/handle'
const store= useStore();
const router= useRouter();
let showDragBox= ref(false);
let info=store.state.userInfo;
let birthday = ref(new Date(info.birthday));
let uploadDom=ref(null);
function clickFile(){
    uploadDom.value.click();
}
function uploadDrag(){
    showDragBox.value=true;
    // uploadDom.value.click();
}
async function dragEnd(e){
    if(e.dataTransfer.files[0].type !='image/jpeg')
    {
        ElMessage({
            message: '文件格式不正确',
            type: 'warning',
        })
        return;
    }
    let formdata= new FormData();
    formdata.append('imgFile', e.dataTransfer.files[0]);
    const res = await updateAvatar(formdata);
    if (res.data.data.code == 200) {
        ElMessage({
            message: '修改成功',
            type: 'success',
        })
        store.state.userInfo.avatarUrl = res.data.data.url;
        info.avatarUrl = res.data.data.url;
        showDragBox.value = false;
    }
}
function leave(e){
    showDragBox.value = false;
}
async function clickUpload(){
    let formdata = new FormData();
    formdata.append('imgFile', uploadDom.value.files[0]);
    const res = await updateAvatar(formdata);
    if(res.data.data.code== 200)
    {
        ElMessage({
            message: '修改成功',
            type: 'success',
        })
        store.state.userInfo.avatarUrl = res.data.data.url;
        info.avatarUrl = res.data.data.url;
    }
}
async function update(){
    console.log(info.nickname,info.gender,info.signature,birthday.value);
    const res=await updateInfo(info.gender, info.signature, info.nickname,Date.parse(birthday.value));
    if(res.data.code==200)
    {
        ElMessage({
            message: '修改成功',
            type: 'success',
        })
    }
}
onMounted(()=>{
        const doc = document.documentElement
        doc.addEventListener('dragleave', (e) => e.preventDefault()) //拖离
        doc.addEventListener('drop', (e) => e.preventDefault()) //拖后放
        doc.addEventListener('dragenter', (e) => e.preventDefault()) //拖进
        doc.addEventListener('dragover', (e) => e.preventDefault()) //拖来拖去
})
</script>

<style scoped>
.dragUpload{
    position: absolute;
    width:500px;
    height:400px;
    border:2px dashed red;
    background-color:white;
    text-align: center;
    line-height: 400px;
    top:90%;
    left:50%;
    transform: translate(-50%, -50%);
}
.submit-wrap{
        margin: 10px 0 0 80px;
}
.submit-wrap button{
    padding: 4px 14px;
    width: 52px;
    height: 22px;
    box-sizing:content-box;
}
.box{
    width:80%;
    margin:0 auto;
    position: relative;
}
.edit-img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
}
.edit-img-container{
    width:140px;
    margin-left: 30px;
}
.edit_info{
    display: flex;
}
.btn-wrap{
    text-align: center;
    margin-top:10px;
}
</style>
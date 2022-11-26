<template>
    <router-view></router-view>
    <player />
</template>

<script setup>
import player from '../components/player.vue'
import { loginStatus } from '../api/login';
import { getLikeList } from '../api/list';
import { useStore } from 'vuex';
let store = useStore();
async function getMyLike(uid) {
    const  res= await getLikeList(uid);
    store.state.likeList = res.data.ids;
}
async function getloginState() {
    const status = await loginStatus();
    if (status.data.data.profile) {
        let Info = status.data.data.profile;
        store.commit('changeState', Info);
        getMyLike(Info.userId);
        console.log(status.data.data.profile)
    }
    else {
        store.state.isLogin = false;
        store.state.userInfo = {};
        localStorage.clear();
    }
}
getloginState();
</script>

<style>

</style>
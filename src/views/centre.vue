<template>
    <router-view></router-view>
    <player />
</template>

<script setup>
import player from '../components/player.vue'
import { loginStatus } from '../api/login';
import { useStore } from 'vuex';
let store = useStore();
async function getloginState() {
    const status = await loginStatus();
    if (status.data.data.profile) {
        let Info = status.data.data.profile;
        store.commit('changeState', Info);
    }
    else {
        store.state.isLogin = false;
        store.state.userInfo = {};
        localStorage.clear();
    }
    console.log(status.data.data);
}
getloginState();
</script>

<style>

</style>
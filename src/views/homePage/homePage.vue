<template>
    <myHeader/>
    <el-container>
        <el-aside  width="200px">
            <asideMenu />
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
    <el-backtop :right="100" :bottom="100" />
</template>

<script setup>
import myHeader from '../../components/MyHeader.vue'
import asideMenu from '../../components/AsideMenu.vue'

</script>

<style>

</style>
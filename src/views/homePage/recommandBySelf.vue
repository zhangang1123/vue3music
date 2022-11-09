<template>
  <div class="recommand">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <img src="../../assets/img/login.jpg" alt="error">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.recommand{
  width: 1200px;
  margin: 0 auto;
}
</style>
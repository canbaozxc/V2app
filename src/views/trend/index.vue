<template>
  <div class="trend">
   <!-- 头部-->
    <component v-bind:is="'trendTitle'"><!-- :gameType="gameType" @depathLottory="getLottoryData"
               @depathGameData="getGameData" @depathTpl="getTplTemp"-->></component>
    <bottomNavbar />
  </div>
</template>
<style scoped>

</style>

<script>
// @ is an alias to /src


import bottomNavbar from '@/components/public/Navbar.vue'

export default {
  name: 'trend',
  components: {
    bottomNavbar,
    trendTitle: () => import("@/components/trend/trendTitle.vue"),
  },
  mounted(){
    /*this.$store.commit('add');
    console.log(this.$store.getters.inconr);*/
  }
}
</script>

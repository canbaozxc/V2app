<template>
  <div class="activityDetails">
      <titleBar title="优惠活动" />
        <div class="main">
        </div>
  </div>
</template>
<style lang="less" scoped>
.activityDetails{
    .main{
        padding: 0 0.15rem;
        
    }
}
</style>


<script>
import { Icon } from "iview"
import titleBar from "@/components/public/Title-bar.vue"
import minxins from '@/js/minxins.js';
export default {
  name:"noice",
  mixins:[minxins],
  components:{
      titleBar,
      Icon
  },
  data(){
    return{
    }
  },
  methods:{

  },
  created(){

  },
  mounted(){
    //let oDiv = document.getElementById("div1");
    this.bgColor("#FFF");
  }
}
</script>


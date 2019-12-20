<template>
  <div class="about">
    <div id="div1">
      <Select v-model="bankname" style="width:200px">
          <Option v-for="item in bankList" :value="item.value" :key="item.value">{{ item.label }}</Option>

      </Select>
    </div>
  </div>
</template>
<style scoped>
  #div1{
    width: 1rem;
    height: 1rem;
    background: red;
    position: absolute;
  }
</style>

<script>
import { Icon,Form,FormItem,Input,Row,Col,Select,Option } from "iview"
export default {
  name:"xxx",
  components:{
    Icon,Form,FormItem,Input,Row,Col,Select,Option
  },
  data(){
    return{
      bankname:'',
      bankList:[
          {
              label:"中国银行",
              value:"zgyh"
          },
          {
              label:"招商银行",
              value:"zsyh"
          },
          {
              label:"农业银行",
              value:"nyyh"
          },
      ]
    }
  },
  methods:{

  },
  created(){

  },
  mounted(){
    //let oDiv = document.getElementById("div1");
    
  }
}
</script>


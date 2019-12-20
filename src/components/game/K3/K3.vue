<!--快三玩法分拣页面-->
<template>
    <div class="k3_way">
        <Notice v-model="bet_note" />
        <component ref="mychild" v-bind:is="dataTpl.ball.ballsName" :dataWay="dataWay"  :dataTpl="dataTpl" :Item="Item" :groupData="groupData" v-if="dataTpl!=''" @depathBall="getBall">
            <template v-slot:bonus_note>{{bonus_note}}</template>
        </component>
    </div>
</template>
<script>
import K3DataGameBall from "@/components/game/K3/k3.js";
import Notice from '@/components/game/Notice.vue'
export default {
    name:'k3way',
    components:{
        k3common:() => import("@/components/game/K3/common.vue"),
        Notice,
    },
    props:{
        value:{
            type:Object,
            default:{}
        },
        Item:{
            type:Object,
            default:{}
        },
        groupData:{
            type:Object,
            default:{}
        },
        dataWay:{
            type:Object,
            default:{}
        }
    },
    data(){
        return{
            dataTpl:'',
            group_rate:'',
            noticeStr:'',
            bonus_note:"",
            bet_note:"",
        }
    },
    methods:{
        init(data){//初始化所有快三玩法数据，模板映射
            if(K3DataGameBall[data.series_way_id]){
                //console.log(data);
                let dataTpl = {};
                switch (data.series_way_id) {
                    default:
                        dataTpl = K3DataGameBall[data.series_way_id];
                        dataTpl.prizeSet=data;
                        break;
                }
                this.dataTpl = dataTpl;
                this.$emit("depathTpl",dataTpl);
            }
        },
        getBall(ball){
            console.log(ball);
            this.$emit("depathBall",ball);
        },
        clear(){
            this.$refs.mychild.clearlmTpmisable();
        },
        initdataWay(val){
            this.noticeStr = val.bet_note+val.bonus_note;
            this.bet_note = val.bet_note!==null?val.bet_note:"暂无说明，请联系管理员";
            this.bonus_note = "中奖说明："+(val.bonus_note!==null?val.bonus_note:"暂无说明，请联系管理员");
        }
    },
    watch:{
        value:{  
            handler:function(val,oldval){ 
                if(val!=oldval){
                    this.$nextTick(()=>{
                        this.init(val);
                        console.log(val);
                    })
                }
            },  
            immediate:true,//关键
            deep:true
        },
        Item:{  
            handler:function(val,oldval){ 
                if(val!=oldval){
                    this.$nextTick(()=>{
                        //this.setrate(val);
                        //console.log(val);
                    })
                }
            },  
            immediate:true,//关键
            deep:true
        },
        groupData:{  
            handler:function(val,oldval){ 
                if(val!=oldval){
                    this.$nextTick(()=>{
                        //this.setrate(val);
                        //console.log(val);
                    })
                }
            },  
            immediate:true,//关键
            deep:true
        },
        dataWay:{
            handler:function(val,oldval){ 
                if(val!=oldval){
                    this.$nextTick(()=>{
                        this.initdataWay(val);
                        //console.log(val);
                    })
                }
            },  
            immediate:true,//关键
            deep:true
        }
    }
}
</script>

<style lang="less" scoped>
//玩法两面
    .k3_way{
        .k3_hzhzlm{
            
        }
    }
</style>


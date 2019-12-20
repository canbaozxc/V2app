<!--PK10玩法分拣页面-->
<template>
    <div class="PK10_way">
        <Notice v-model="bet_note" />
        <component ref="mychild" v-bind:is="dataTpl.ball.ballsName" :dataWay="dataWay"  :dataTpl="dataTpl" :Item="Item" :groupData="groupData" v-if="dataTpl!=''" @depathBall="getBall">
            <template v-slot:bonus_note>{{bonus_note}}</template>
        </component>
        
    </div>
</template>
<script>
import PK10DataGameBall from "@/components/game/PK10/PK10.js";
import Notice from '@/components/game/Notice.vue'
export default {
    name:'PK10way',
    components:{
        PK10noteList:() => import("@/components/game/PK10/noteList.vue"),
        PK10common:() => import("@/components/game/PK10/common.vue"),
        PK10quick:() => import("@/components/game/PK10/common_quick.vue"),
        PK10qiu:() => import("@/components/game/PK10/common_qiu.vue"),
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
        if(PK10DataGameBall[data.series_way_id]){//防止数据延迟，只有数据真正传过来了才能执行
            let dataTpl = {};
            switch (data.series_way_id) {
                default:
                        console.log(PK10DataGameBall[data.series_way_id]);
                    
                        dataTpl = PK10DataGameBall[data.series_way_id];
                        dataTpl.prizeSet = data;
                    break;
            }
            this.dataTpl = dataTpl;
            this.$emit("depathTpl",dataTpl);
        }
        },
        getBall(ball){
            this.$emit("depathBall",ball);
        },
        clear(){
            this.$refs.mychild.clearlmTpmisable();
        },
        initdataWay(val){
            this.noticeStr = ""+val.bet_note+val.bonus_note;
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


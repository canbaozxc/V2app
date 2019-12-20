<template>
    <div class="method" v-show="visible" >
        <div class="keep"  @click="closeMethod"></div>
        <div class="playing_method_list" >
            <ul>
                <li v-for="(item,index) in wayGroups" :class="wayGroupsId===item.id?'on':''" :key="index"  @click="changeWayList(item.id)">{{item.name_cn}}</li>
            </ul>
            <div class="clr"></div>
            <dl v-for="(Couml,index) in wayList" :key="index">
                <dt>{{Couml.name_cn}}</dt>
                <dd v-for="(items,k) in Couml.children" :class="wayId==items.id?'active':''"  @click="changeWayl(items)"  :key="k">{{items.name_cn}}</dd>
            </dl>
        </div>
    </div>
</template>
<script>
import { log } from 'util';
export default {
    name:'checklottory',
    props:{
        value: {
            type: Boolean,
            default: false
        },
        data:{
            type:Array,
            default:[]
        },
        defaultId:{
            type:String,
            default:''
        }
    },
    data(){
        return {
            visible: this.value,
            wayGroups:this.data,//玩法组列表
            wayId:this.defaultId,//选中的玩法id
            wayList:[],//玩法列表
            wayGroupsId:'',//玩法组ID
            wayName:'',//选中的玩法
            wayName_en:'',//玩法组件标签名
            bet_note:'',//玩法规则
            bonus_note:'',//中奖规则
            typeCN:'',
            wayId:'',//玩法id
            
        }
    },
    methods:{
        //获取玩法
        closeMethod(){
            this.visible = false;
            this.$emit('showStatus',false);
        },
        
        //选择方法组
        changeWayList(id){
            this.wayGroupsId = id;
            let wayGroups = this.wayGroups;
            for(let i = 0;i<wayGroups.length;i++){
                if(id===wayGroups[i].id){
                    //this.wayList = wayGroups[i].children[0].children;
                    this.wayList = wayGroups[i].children;
                }
            }
        },
        //选择方法
        changeWayl(item){
            //console.log(item);
            //this.wayName = item.name_cn;
            this.wayId = item.id;
            this.wayGroupsId = this.getDefaultGroup(this.wayId,this.wayGroups);//默认方法组id
            let data = {
                wayId:this.wayId,
                wayGroupsId:this.wayGroupsId,
                wayName:this.wayName,
                wayName_en:this.wayName_en,
                typeCN:this.typeCN,
                bet_note:this.bet_note,
                bonus_note:this.bonus_note
            }
            this.$emit('depathMethod',data);
            this.closeMethod();
        },
        //获取默认方法组ID
        getDefaultGroup(defaultId,wayGroups){
            for(let i = 0;i<wayGroups.length;i++){
                let ch1 = wayGroups[i].children;
                let pid = wayGroups[i].id;
                for(let j=0;j<ch1.length;j++){
                    ch1[j].dfpid = pid;
                    let ch2 = ch1[j].children;
                    for(let k=0;k<ch2.length;k++){
                        ch2[k].dfpid = ch1[j].dfpid;
                        if(defaultId ==ch2[k].id){
                            this.typeCN = wayGroups[i].name_cn+'.'+ch1[j].name_cn+'.'+ch2[k].name_cn;
                            this.wayName = ch2[k].name_cn;
                            this.wayName_en = wayGroups[i].name_en+'.'+ch1[j].name_en+'.'+ch2[k].name_en;
                            this.bet_note = ch2[k].bet_note;
                            this.bonus_note = ch2[k].bonus_note;
                            return ch2[k].dfpid;
                        }
                        
                    }
                }
                
            }
        },
        //获取默认groupId和玩法Id
        updata(){
            this.wayId = this.defaultId;
            this.wayGroups = this.data;
            if(this.wayId){//已经出现数据再执行
                this.wayGroupsId = this.getDefaultGroup(this.wayId,this.wayGroups);//默认方法组id
                let data = {
                    wayId:this.wayId,
                    wayGroupsId:this.wayGroupsId,
                    wayName:this.wayName,
                    wayName_en:this.wayName_en,
                    typeCN:this.typeCN,
                    bet_note:this.bet_note,
                    bonus_note:this.bonus_note
                }
                this.changeWayList(this.wayGroupsId);//默认方法组
                this.$emit('depathMethod',data);
            }
            
        }
    },
    created(){
        //this.getGameSettingForBet();
        
        
    },
    mounted(){
        
    },
    watch:{
        value (val) {
            this.visible = val;
        },
        data:{  
            handler:function(val,oldval){ 
                if(val!=oldval){
                    this.$nextTick(()=>{
                    })
                }
            },  
            immediate:true,//关键
            deep:true
        },
        defaultId:{  
            handler:function(val,oldval){ 
                if(val!=oldval){
                    this.$nextTick(()=>{
                        this.updata()
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
.method{
    .keep{
        background: rgba(3,3,3,.31);
        position: fixed;
        top: 0.5rem;
        bottom: 0;
        width: 100%;
        z-index: 50;
    }
    .playing_method_list{
        background: #FFF;
        position: fixed;
        top: 0.5rem;
        width: 100%;
        z-index: 51;
        .clr{
            height: 1px;
            background-color: #ddd;
            clear: both;

        }
        ul{
            margin-right: 2%;
            width: 98%;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-line-pack: center;
            align-content: center;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            padding-bottom: 0.1rem;
            li{
                width: 31.33%;
                margin-left: 2%;
                min-height: 0.3rem;
                line-height: 0.3rem;
                border: 1px solid #eee;
                border-radius: 3px;
                margin-top: .06rem;
                text-align: center;
                display: table;
                color: #999;
            }
            .on{
                color: #be1204;
                border-color: #be1204;
            }
        }
        dl{
            width: 98%;
            position: relative;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-line-pack: center;
            align-content: center;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-right: 2%;
            padding-bottom: 0.1rem;
            dt{
                width: 23%;
                margin-left: 2%;
                text-align: center;
                min-height: 0.3rem;
                line-height: 0.3rem;
                color: #000;
                margin-top: .03rem;
            }
            dd{
                width: 23%;
                margin-left: 2%;
                min-height: 0.3rem;
                line-height: 0.3rem;
                border: 1px solid #eee;
                border-radius: 3px;
                text-align: center;
                display: table;
                color: #999;
                margin-top: .03rem;
            }
            .active{
                color: #be1204;
                border-color: #be1204;
            }
        }
    }
}

</style>


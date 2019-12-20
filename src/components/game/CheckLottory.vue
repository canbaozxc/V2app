<template>
    <div class="lottory"  v-if="visible" >
        <div class="keep" @click="closeLottory"></div>
        <div class="lottory_list">
            <ul>
                <li v-for="(item,index) in data" :key="index" :class="game_type===item.identifier?'on':''" @click="getidentifier(item)">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
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
        Identifier:{
            type:String,
            default: ''
        }
    },
    data(){
        return {
            visible: this.value,
            lotteryList:[],
            game_type:this.Identifier
        }
    },
    methods:{
        //4.关闭
        closeLottory(){
            this.visible = false;
            this.$emit('showStatus',false);
        },
        //3.获取彩种唯一标识
        getidentifier(item){
            //console.log(item);
            this.game_type = item.identifier;
            this.$router.push('/game/'+item.identifier);
            let data = item
            //获取当前彩系
            data.caixi = this.getGameSeries(item.series_id);
            this.closeLottory();
            this.$emit('depathLottery',data);
        },
        //1.初始化的时候获取彩种唯一标识
        defaultidentifier(){
            let item = '';
            for(let i=0;i<this.data.length;i++){
                if(this.data[i].identifier===this.game_type){
                    item = this.data[i];
                }
            }
            //获取当前彩系
            item.caixi = this.getGameSeries(item.series_id);
            this.closeLottory();
            this.$emit('depathLottery',item);
        },
        //2.获取当前彩系
        getGameSeries(series_id){
            let getGameSeries = JSON.parse(localStorage.getItem("getGameSeries"));
            let identifier = '';
            for(let i=getGameSeries.length;i--;){
                if(getGameSeries[i].id === series_id){
                    identifier = getGameSeries[i].identifier;
                }
            }
            //区分彩系操作
            this.setIdentifier(identifier);
            return identifier;
        },
        //彩系工具方法，分清使用对应组件
        setIdentifier(identifier){
            switch (identifier) {
                case 'SSC'://时时彩
                    break;
                case 'L115'://11选5
                    break;
                case '3D'://3D
                    break;
                case 'K3'://快三
                    break;
                case 'PK10'://PK10
                    break;
                case 'JC'://竞彩
                    break;
                case 'KENO'://KENO
                    break;
                case 'KL12'://快乐12
                    break;
                case 'KLSF'://KLSF
                    break;
                case 'LIUHE'://六合彩
                    break;
                default:
                    break;
            }
        }
    },
    created(){
        this.defaultidentifier();
    },
    mounted(){
        //this.getLotteryList();
        //console.log(this.data);
        
    },
    watch:{
        value (val) {
            this.visible = val;
        },
    }
}
</script>

<style lang="less" scoped>
.lottory{
    .keep{
        background: rgba(3,3,3,.31);
        position: fixed;
        top: 0.5rem;
        bottom: 0;
        width: 100%;
        z-index: 50;
    }
    .lottory_list{
        background: #FFF;
        position: fixed;
        top: 0.5rem;
        width: 100%;
        z-index: 51;
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
    }
}

</style>


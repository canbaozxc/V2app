
<template>

    <div class="my-table">
        <!--表头-->
        <ul class="tit"  :style="{width:tableWidth+'px'}">
            <li class="th"  :style="{width:item.width+'px'}" v-for="(item,index) in columns" :key="index">{{item.title}}</li>
        </ul>
        <!--表身-->
        <div class="bd" >
            <ul v-for="(col,i) in data" :key="i" :style="{width:tableWidth+'px'}">
                <!--判断是否有render字段，如果有，则运行render-->
                <li class="td" v-for="(item,index) in columns" :key="index" :style="{width:item.width+'px'}" v-if="!item.render" >{{col[item.key]}}</li>
                <li v-else  class="td" :style="{width:item.width+'px'}">
                    <!--render组件-->
                    <Expand :key="i" :row="col" :render="item.render?item.render:''" :index="i"></Expand>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="less" scoped>
.my-table{
    width: 100%;
    position: relative;
    overflow: auto;
    .tit{
        display: flex;
        height: 0.35rem;
        .th{
            border-right: none;
            height: 0.35rem;
            line-height: 0.35rem;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            background-color: #f8f8f9;
        }
        
    }
    .bd{
        ul{
            display: flex;
            height: 0.35rem;
            .td{
                border-right: none;
                height: 0.35rem;
                line-height: 0.35rem;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                background-color: #FFF;
            }
        }
    }
}
</style>

<script>
import { Scroll} from "iview"
//引入render组件
import Expand from '@/components/public/table/Expand.js';
import minxins from '@/js/minxins.js';
export default {
    props:{
        //1.设置属性值
        data: {
            type: Array,
            default () {
                return [];
            }
        },
        columns: {
            type: Array,
            default () {
                return [];
            }
        },
    },
    components:{
        Scroll,
        Expand
    },
    computed: {
        //动态计算宽度
        tableWidth(){
            let width = 0;
            for(let i=0;i<this.columns.length;i++){
                width += this.columns[i].width;
            }
            return width;
        },
    },
    data(){
        return{
            
        }
    },
    methods:{
        
        show(obj){
            console.log(obj);
        }
    },
    created(){
        
    },
    mounted(){
        
    }
}
</script>
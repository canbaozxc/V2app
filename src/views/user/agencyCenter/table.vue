
<template>
<Scroll :on-reach-bottom="handleReachBottom" :height="667">
    <myTable :columns="columnsItem" :data="data"></myTable>
</Scroll>
</template>
<style lang="less" scoped>
.my-table{
    width: 100%;
    position: relative;
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
import myTable from '@/components/public/table/table.vue';
import minxins from '@/js/minxins.js';
export default {
    components:{
        Scroll,
        myTable
    },
    computed: {
        tableWidth(){
            let width = 0;
            for(let i=0;i<this.columnsItem.length;i++){
                width += this.columnsItem[i].width;
            }
            return width;
        },
    },
    data(){
        return{
            data:[
            ],

            columnsItem: [
                {
                    title: '操作',
                    key: 'action',
                    width: 80,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params)
                                        }
                                    }
                                }, '查看下级'),
                            ]);
                    }
                },
                {
                    title: '用户名',
                    key: 'username',
                    width: 100,
                },
                {
                    title: '用户类型',
                    key: 'usertype',
                    width: 100
                },
                {
                    title: '奖金组',
                    key: 'prize',
                    width: 100
                },
                {
                    title: '下级人数',
                    key: 'lowerNum',
                    width: 100
                }
                
            ],
            wH:667,
        }
    },
    methods:{
        async getData(){//ajax
            console.log("请求easymock");
            let res = await this.$api.getlowlist();
            if(this.data.length<1){
            this.data=res.data;
            }else{
            this.data=this.data.concat(res.data);
            }
        },
        handleReachBottom () {
            return new Promise(resolve => {
                setTimeout(() => {
                    this.getData();
                    resolve();
                }, 2000);
            });
        },
        show(obj){
            console.log(obj);
        }
    },
    created(){
        this.wH = $(window).height();
    },
    mounted(){
        this.getData();
        let _this = this;
        /*setTimeout(function(){
        _this.getList();
        },100);*/
        $(function(){
        //console.log($(window).height());
        let wH = $(window).height();
        
        let soll = '';
        $(document).scroll(function () {
            soll = $(document).height() - wH - $(document).scrollTop();
            console.log($(document).scrollTop());
            if(soll<5){
                _this.getData();
            }
            
        })
        
        })
    }
}
</script>
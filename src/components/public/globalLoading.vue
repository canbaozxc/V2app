<template>
    <div class="loading_main"  v-show="currentshow">
       <div class="loading_model">
           <div class="loading_model_content">
               <loading type="spinner"/>
           </div>
       </div>
    </div>
</template>

<script>
    import { Loading } from 'vant';
    export default {
        name:"globalLoading",
        props: {
            value: {
                type: Boolean,
                default: ''
            },
        },
        data () {
            return {
                currentshow: this.value,
            }
        },
        components:{
            Loading
        },
        computed: {
        },
        methods: {
            
        },
        beforeMount: function () {
        },
        watch: {
            value (val) {
                console.log(val);
                this.currentshow = val;
            }
        },
        created(){
        }
    }
</script>

<style lang="less" scoped>

.loading_main{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55,55,55,.6);
    height: 100%;
    z-index: 1000;
    .loading_model{
        width: auto!important;
        margin: 10px;
        position: relative;
        outline: 0;
        top: 100px;
        .loading_model_content{
            position: relative;
            background-color: #333;
            border: 0;
            border-radius: 6px;
            background-clip: padding-box;
            box-shadow: 0 4px 12px rgba(0,0,0,.15);
            .van-loading{
                padding: 0.5rem;
                .van-loading__spinner {
                    width: 0.5rem;
                    height: 0.5rem;
                }
            }
        }
    }
    
}
</style>

<
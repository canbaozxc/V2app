<template>
    <div v-show="visible" class="trendSetting">
        <div class="trendSettingti">
            <div class="setting">
                <div class="setting-title">
                    <span>走势图设置</span>
                </div>
                <div class="setting-con">
                    <div>
                        <Row type="flex" justify="start" style="font-size: 14px">
                            <Col span="8" class="setting-col">
                                <span> 折线:</span>
                            </Col>
                            <Col span="12">
                                <Radio-group v-model="polyline">
                                    显示:<Radio value="1"></Radio>
                                    隐藏: <Radio value="2"></Radio>
                                </Radio-group>
                            </Col>
                        </Row>
                        <Row type="flex" justify="start" style="font-size: 14px">
                            <Col span="8" class="setting-col">
                                <span> 遗漏:</span>
                            </Col>
                            <Col span="12">
                                <Switch size="large" v-model="switch1"  @on-change="change">
                                </Switch>
                            </Col>
                        </Row>
                        <Row type="flex" justify="start" style="font-size: 14px">
                            <Col span="8" class="setting-col">
                                <span>统计:</span>
                            </Col>
                            <Col span="12">
                                <Switch size="large" v-model="switch1"  @on-change="change">
                                </Switch>
                            </Col>
                        </Row>
                        <Row type="flex" justify="start" style="font-size: 12px">
                            <Col span="24">
                                <span style="color: #b6b6b6">走势图底部的出现次数等统计数据</span>
                            </Col>
                        </Row>
                        <Row type="flex" justify="start" style="font-size: 14px">
                            <Col span="8" class="setting-col">
                                <span>遗漏分层:</span>
                            </Col>
                            <Col span="12">
                                <Switch size="large" v-model="switch1"  @on-change="change">
                                </Switch>
                            </Col>
                        </Row>
                    </div>
                    <div class="setting-btn">
                            <Button style="margin-right: 10px" type="primary" size="large" @click="closeSetting">取消</Button>
                            <Button type="error" size="large" @click="getSetting">确定</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {Button,Row,Col,Switch,RadioGroup,Radio} from "iview"
    export default {
        name: "trendSetting",
        components:{
            Button,
            Row,
            Col,
            Switch,
            RadioGroup,
            Radio
        },
        props:{
            value: {
                type: Boolean,
                default: false
            },
        },
        data(){
            return {
                polyline:'1',
                switch1:true,
                visible: this.value,
            }
        },
        methods: {
            getSetting(){

            },
            closeSetting(){
                this.$parent.openMethod();
            },
            change (status) {
                this.$Message.info('开关状态：' + status);
            },
            init(){
                console.log(this.value)
            },
            //4.关闭
            closeLottory(e) {
                this.visible = e;
            },
        },
        created(){
           this.init();
           this.closeLottory();
        }
    }
</script>

<style lang="less" scoped>
    .trendSetting{
        .trendSettingti{
            background: rgba(3, 3, 3, 0.31);
            position: fixed;
            top: 0.5rem;
            bottom: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            .setting{
                background: #fafafc;
                border-radius: 0.1rem;
                width: 90%;
                position: absolute;
                top: 30%;
                left: 5%;
                transform: translate(0, -50%);
                padding: 0.1rem 0.2rem 0.2rem 0.2rem;
                .setting-title{
                    padding: 0.2rem 0.2rem 0.15rem 0.2rem;
                }
                .setting-con{
                    border-top: 0.01rem solid #e5e5e5;
                    .setting-col{
                        text-align: right;
                    }
                    .setting-btn{
                        border-top: 0.01rem solid #e5e5e5;
                        padding-top: 0.1rem;
                        text-align: center;
                    }
                }
            }
        }
    }

</style>
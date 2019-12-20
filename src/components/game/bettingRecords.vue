<template>
    <div class="scroll">
        <div @click="openBettingDetails(item.id)" v-for="(item, index) in list" :key="index"
             class="cordLi">
            <Row type="flex" justify="start" align="top">
                <Col span="11" class="asd1">
                    <p>{{item.lottery}}<strong>[{{item.way}}]</strong></p>
                    <p>投注金额：{{item.coefficient}}</p>
                </Col>
                <Col span="10" class="bsd1" style="">
                    <p>{{item.bet_number}}</p>
                    <p :class="item.prize.charAt(0)==='-'?'green':'red'">
                        {{item.prize.charAt(0)==='-'?item.status:"已中"+item.prize+"元"}}</p>
                </Col>
                <Col span="3" class="csd1">
                    <Icon type="ios-arrow-forward"/>
                </Col>
            </Row>
        </div>
        <div v-if="list.length>=count">没有了...</div>
    </div>
</template>

<script>
    export default {
        name: "bettingRecords",
        props:{
            list:bettingRecordList,
        }
    }
</script>

<style scoped>

</style>
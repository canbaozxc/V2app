<template>
    <div v-if="value">没有了...</div>
</template>
<style lang="less" scoped>

</style>
<script>
export default {
    name:'OverLoad',
    props:{
        value: {
            type: Boolean,
            default: false
        },
    }
}
</script>



<template>
    <base-city @cityData="city"></base-city>
</template>
<style lang="less" scoped>

</style>
<script>
import BaseCity from "@/components/public/BaseCity.vue"
export default {
    name:"city",
    components:{
        BaseCity
    },
    methods:{

        city(data){

            console.log("省"+data.province+"市"+data.city+"区"+data.area)

        }

    }
}
</script>

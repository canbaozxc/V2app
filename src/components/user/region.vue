<template>
    <div>
        省:<select v-model="prov" style="width:20%"  @change="updateCity" id="prov">
        <option v-for="item in arrList" :value="item.Name" :key="item.Id">{{ item.Name }}</option>
    </select>
        市:<select v-model="city" style="width:20%" @change="updateDistrict" id="city">
        <option v-for="item in cityArr" :value="item.Name" :key="item.Id">{{ item.Name }}</option>
    </select>
        区:<select v-model="district" style="width:20%" @change="updateDistricts" id="district">
        <option v-for="item in districtArr" :value="item.Name" :key="item.Id">{{ item.Name }}</option>
    </select>
    </div>
</template>

<script>
    let region = require('../../static/region')
    export default {
        data () {
            return {
                prov:'',
                provId:'',
                city:'',
                cityId:'',
                district:'',
                districtId:'',
                cityArr: [],
                districtArr: [],
                arr:[],
                arrList:[],
            }
        },
        methods: {
            init(){
                this.arrList =region;
            },
            updateCity () {
                let vm = this;
                for (let i in this.arrList) {
                    let obj = this.arrList[i];
                    if (obj.Name == vm.prov) {
                        this.cityArr = obj.Sub;
                        this.provId = obj.Id;
                        break;
                    }
                }
                this.city = this.cityArr[0].Name;
            },
            updateDistrict () {
                let vm = this;
                for (let i in this.cityArr) {
                    let obj = this.cityArr[i];
                    if (obj.Name == this.city) {
                        this.cityId = obj.Id;
                        this.districtArr = obj.Sub;
                        break;
                    }
                }
                if(this.districtArr && this.districtArr.length > 0 && this.districtArr[0].Name) {
                    this.district = this.districtArr[0].Name;
                } else {
                    this.district = '';
                }
                this.$emit('regionList',this.provId,this.prov,this.cityId,this.city,this.districtId,this.district);
            },
            updateDistricts(){
                let vm = this;
                for (let i in this.districtArr) {
                    let obj = this.districtArr[i];
                    if (obj.Name == this.district) {
                        this.districtId = obj.Id;
                        break;
                    }
                }
                this.$emit('regionList',this.provId,this.prov,this.cityId,this.city,this.districtId,this.district);
            }
        },
        beforeMount: function () {
            this.updateCity();
            this.updateDistrict();
            this.updateDistricts
        },
        watch: {
            prov: function () {
                this.updateCity();
                this.updateDistrict();
            },
            city: function () {
                this.updateDistrict();
            },
        },
        created(){
            this.prov = "北京";
            this.init();
        }
    }
</script>

<style scoped>

</style>

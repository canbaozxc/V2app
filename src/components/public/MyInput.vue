<template>
    <input
        type="text"
        :value="currentValue"
        @input="handleInput"
        @blur="handleBlur"
    />
</template>
<script>
    import emit from '../../js/emitter.js';

    export default {
        name: 'MyInput',
        mixins: [ emit ],
        props: {
            value: {
                type: String,
                default: ''
            },
        },
        data () {
            return {
                currentValue: this.value
            }
        },
        watch: {
            value (val) {
                this.currentValue = val;
            }
        },
        methods: {
            handleInput (event) {
                const value = event.target.value;
                this.currentValue = value;
                this.$emit('input', value);
                this.dispatch('iFormItem', 'on-form-change', value);
            },
            handleBlur (event) {
                this.$emit('on-blur', event);
                this.dispatch('FormItem', 'on-form-blur', this.currentValue);
                
            },
        }
    }
</script>
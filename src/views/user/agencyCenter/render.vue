

<script>

    export default {
        render(h) {
           return (<div><a onClick={() => this.show('123')} style="margin-right: 5px;">查看下级</a></div>)
        },
        data () {
            return {
                
            }
        },
        methods: {
            show (index) {
                console.log(index);
            },
            
        },
        created(){
        }
    }
</script>
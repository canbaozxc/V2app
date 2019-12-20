
export default {
    data: function () {
        return {
            isLogin:localStorage.getItem('isLogin')?eval(localStorage.getItem('isLogin').toLowerCase()):false,
        }
    },
    methods: {
        bgColor(color){
            document.querySelector('body').setAttribute('style', 'background-color:'+color);
        },
        rouLink(url) {//页面跳转
            if(this.isLogin){
                this.$router.push(url);
            }else{
                this.$Modal.error({
                    title: '请先登录',
                    content: '您尚未登录，请先登录！点击立即登录，跳转到登录页面；点击取消，返回当前页面。',
                    okText: '立即登录',
                    cancelText: '取消',
                    onOk: () => {
                        this.$router.push('/login');
                    },
                });
            }
        },
        //提示升级中
        shenjizhong(){
            this.$Message.info("正在升级中！");
        },
        //时间戳转YYYY-MM-dd hh:mm:ss
        dateFormatter(value, row, index) {
            let date = new Date(value * 1000);
            let yy = date.getFullYear();
            let MM = date.getMonth() + 1;
            let dd = date.getDate();
            let hh = date.getHours();
            let mm = date.getMinutes();
            let ss = date.getSeconds();
            if (MM < 10)
                MM = "0" + MM;
            if (dd < 10)
                dd = "0" + dd;
            if (hh < 10)
                hh = "0" + hh;
            if (mm < 10)
                mm = "0" + mm;
            if (ss < 10)
                ss = "0" + ss;
            return "" + yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
        },
        backHistory(){
            this.$router.go(-1);//返回上一层
        },
        setLocal(name,value){
            localStorage.setItem(name, value);
        },
        setValue(name,value){
            this[name] = value;
        },
        //取反
        getNegation(name){
            this[name] = !this[name];
        },
        //获取缓存中的用户信息
        getUserItem(key){
            let str = localStorage.getItem('userData');
            let user = eval ("(" + str + ")");
            return user[key]
        },
        //日期转字符串
        getFormatDate(dateTime,type) {
            let date = new Date(dateTime);
            let seperator = "-";
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let nowDate = date.getDate();
            if(month >=1 && month <=9) {
            month = "0" + month;
            }
            if(nowDate >=0 && nowDate <=9) {
            nowDate = "0" + nowDate;
            }
            let newDate = year + seperator + month + seperator + nowDate;
            if(type==="start"){
            newDate+=" 00:00:00";
            }else{
            newDate+=" 23:59:59";
            }
            return newDate;
        },
        //判断是否为空对象
        jsonIsNoll(obj) {
            for(let key in obj) {
            return false;
            }
            return true;
        },
        /*工具方法*/
        //获取class元素，类数组
        getByClass(oPrent,oClass)
        {
            let arr=[];
            let Ele=oPrent.getElementsByTagName("*");
            let re=new RegExp("\\b"+oClass+"\\b");
            for(let i=0;i<Ele.length;i++)
            {
                if(re.test(Ele[i].className))
                {
                    arr.push(Ele[i]);	
                }	
            }
            return arr;
        },
        //事件绑定
        myAddEvent(obj,sEv,fn)
        {
            //IE
            if(obj.attachEvent)
            {
                obj.attachEvent("on"+sEv,function(){
                    if(false==fn.call(obj))
                    {
                        event.cancelBubble=true;
                        return false;	
                    }
                });
            }else{
                obj.addEventListener(sEv,function(ev){
                    if(false==fn.call(obj))
                    {
                        ev.cancelBubble=true;
                        ev.preventDefault();	
                    }	
                },false);	
            }
        },
        getStyle(obj,attr)
        {
            if(obj.currentStyle)
            {
                return 	obj.currentStyle[attr];
            }else{
                return 	getComputedStyle(obj,false)[attr];
            }
        },
        //复制到粘贴版
        copy(url){
            //console.log(this.data[index][con]);
            let oInput = document.createElement('input');
            oInput.value = url;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象
                  //复制到粘贴版
                  try{
                      if(document.execCommand('copy', false, null)){
                          //success info
                          this.$Message.success('复制成功');
                      } else{
                          //fail info
                          this.$Message.warning('您的浏览器不支持此功能，请手动复制');
                      }
                  } catch(err){
                      //fail info
                      this.$Message.error('错误，请重试');
                  }
            oInput.remove()
                
        },
        //删除两个小数点后的数字而非圆数，不四舍五入
        myToFixed(i, digits) {
            let pow = Math.pow(10, digits);

            return Math.floor(i * pow) / pow;
        }

        }
};
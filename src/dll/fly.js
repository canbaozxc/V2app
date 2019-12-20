
//import jsrsasign from 'jsrsasign'//加密
import { JSEncrypt } from 'jsencrypt';
var Fly = require("flyio/dist/npm/fly");
var fly = new Fly;
import {Modal} from 'iview';
import router from '../router.js'
import md5 from 'js-md5';
//本地请求必须禁用cookie
fly.config.withCredentials = false; 
/**RSA非对称加密 */
//非对称rsa加密
function RSAEncode(obj){
    var jsencrypt = new JSEncrypt();
    var k = `-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0Llg1bVZhnyslfezwfeOkvnXW
    q59bDtmQyHvxkP/38Fw8QQXBfROCgzGc+Te6pOPl6Ye+vQ1rAnisBaP3rMk40i3O
    pallzVkuwRKydek3V9ufPpZEEH4eBgInMSDiMsggTWxcI/Lvag6eHjkSc67RTrj9
    6oxj0ipVRqjxW4X6HQIDAQAB
    -----END PUBLIC KEY-----`;
    jsencrypt.setPublicKey(k);
 
    let str = jsencrypt.encrypt(obj);
    
    return str;
}
//参数排序加密验签
// function queryString(url){
//     let arr=[]; //存储参数的数组
//     let res={}; //存储最终JSON结果对象
//     arr=url.split("?")[1].split("&").sort(); //分割数组并排序
//     for(let i=0,len=arr.length;i<len;i++){
//         //如果有等号，则执行赋值操作
//         if(arr[i].indexOf("=")!=-1){
//             let str=arr[i].split("=");
//             //str=[a,1];
//             res[str[0]]=str[1];
//         }else{//没有等号，则赋予空值
//             res[arr[i]]="";
//         }
//     }
//     //console.log();
//     //res=JSON.stringify(res);//转化为JSON字符串
//     //console.log(turnGetParam(res));
//     let str = md5(turnGetParam(res));
//     return str; 
// }
//字符串拼接函数
// function turnGetParam(pream){
//     let str = "";
//     for(let item in pream){
//       str +=item+'='+pream[item]+'&';
//     }
//     str = str.substring(0,str.length-1);
//     return str
//   }
fly.interceptors.request.use((request) => {
    let islogin = request.url.indexOf('action=Login');
    let isReg = request.url.indexOf('action=linkCreateUser');
    var timer=new Date().getTime().toString();
    request.headers["Content-Type"] = 'application/x-www-form-urlencoded';
    //request.headers["Origin"] = '*';
    if(request.method==="POST"){//POST请求使用方式
        request.body.terminal_id=localStorage.getItem("terminal_id");
        if(islogin>-1){
        }else{
            request.body.token=localStorage.getItem('token');
        }
        request.body.t=timer;
        //console.log(request.body);
    }else{//GET请求使用方式
        if(request.body){
            if(islogin>-1&&isReg>-1){
                request.body+="terminal_id="+localStorage.getItem("terminal_id")+"&t="+timer;
            }else{
                request.body+="terminal_id="+localStorage.getItem("terminal_id")+'&token='+localStorage.getItem('token')+"&t="+timer;
            }
            
        }else{
            if(islogin>-1&&isReg>-1){
                //console.log("登录接口走这里",islogin);
                request.body="terminal_id="+localStorage.getItem("terminal_id")+"&t="+timer;
            }else{
                //console.log("不是登录接口走这里");
                request.body="terminal_id="+localStorage.getItem("terminal_id")+'&token='+localStorage.getItem('token')+"&t="+timer;
            }
            
        }
        //拼接访问链接
        let url = request.url+'&'+request.body;
        //获取签名
        //let signStr = queryString(url);
        //console.log(request);
    }
})
function isJSON(str) {
    if (typeof str === 'string') {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }
}
//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    function (response) {
        let jsonStr = response.data;
        if (typeof jsonStr === "string") {
            if (isJSON(jsonStr)) {
                jsonStr = eval('(' + jsonStr + ')');
                response.data = jsonStr;
            }
        }
        //if(response.data.errno){}
        //错误提示
        switch (response.data.errno) {
            case 3004:
                localStorage.setItem('isLogin',false);
                Modal.error({
                    title: "请先登录",
                    content: response.data.error,
                    okText: '去登录',
                    onOk: () => {
                        router.push('/login');
                    },
                });
                return '';
                break;
            case 0:
                return response.data;
                break;
            default:
                Modal.error({
                    title: "错误状态"+response.data.errno,
                    content: response.data.error,
                    okText: '确认',

                });
                return response.data;
                break;
        }
    }
);
export default fly
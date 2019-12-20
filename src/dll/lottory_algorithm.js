/**
 * 投注算法
 */
const lottoryApi = {
    extract,//单行数组去重排列
    arrIndexOf,//检查数组存在某数
    combination2,//二维数组的排列组合
    jingquefushi3,//精确复式3星
    jingquefushi2,//精确复式2星
    zhixuanfushi,//直选复式
    getsummation,//求和投注
    clearStringkongArr,//清除数组为空字符串的项
    danshisanxing,//单式三星匹配
    danshierxing,//单式二星匹配
    zhixuanHezhi3,//直选和值3
    zhixuanHezhi2,//直选和值2
    zhixuankuadu2,//直选跨度2
    zhixuankuadu3,//直选跨度3
    zuxuanpailieC,//组选5星排列选择
    zuxuan2chongjia3,//组选2重号3单号
    zuxuanliange2chongjia1,//组选两个2重号1个单号
    zuxuan3chongjia2,//组选1个三重号2个单号
    zuxuan3chongjia2chong,//组选1个三重号1个二重号，算法参考直选
    zuxuan4chongjia1,//组选1个四重号1个单号，算法参考直选
    zuxuan2chongjia2,//组选1个二重号2个单号
    zuxuan3chongjia1,//组选1个三重号1个单号--四星组选4
    zuxuanzu3,//组选组3
    zuxuanHezhi3,//前三组选和值
    isRepeat,//判断数值中的重复
    isRepeat2,//判断数组是否有重复的数
    baodan3,//三星包胆计算
    baodan2,//二星包胆计算
    zuxuanHezhi2,//二星组选和值
    renxuandantuo,//任选胆拖
    L1x5danshi,//11选5单式
    SSCdanshi,//时时彩单式
};
function isRepeat2(arr){
    var hash = {};
    for(var i in arr) {
    if(hash[arr[i]])
    return true;
    hash[arr[i]] = true;
    }
    return false;
}
//可重复单式
function SSCdanshi(arr,num){
    //console.log(arr,num);
    let _this = this;
    //分割投注项
    for(let i=0;i<arr.length;i++){
        arr[i] = arr[i].split(' ');
        arr[i] = clearStringkongArr(arr[i]);
    }
    
    //判断是否应该留下
    let arr2 = [];
    for(let i=0;i<arr.length;i++){
        if(arr[i].length == num){
            arr2.push(arr[i]);
        }
        
    }
    //判断号码是否重复
    let arr3=arr2;
    // for(let i=0;i<arr2.length;i++){
    //     if(!_this.isRepeat2(arr2[i])){
    //         arr3.push(arr2[i]);
    //     }
    // }
    
    //判断每个项小于10的时候是不是有0
    let arr4 =[];
    for(let i=0;i<arr3.length;i++){
        arr3[i].count = 0;
        for(let j=0;j<num;j++){
            if(arr3[i][j]<=11&&arr3[i][j]>0){//当小于11
                if(arr3[i][j].indexOf('0')>-1 && arr3[i][j].length==2){//如果找到说明正常，啥都不用做
                    arr3[i].count++;
                }else{
                    break;
                }
            }
            //三次验证通过 格式无误
            if(arr3[i].count === num){
                arr4.push(arr3[i]);
            }
        }
    }
    console.log(arr4);
    return arr4;
}
//不可重复单式
function L1x5danshi(arr,num){
    //console.log(arr,num);
    let _this = this;
    //分割投注项
    for(let i=0;i<arr.length;i++){
        arr[i] = arr[i].split(' ');
        arr[i] = clearStringkongArr(arr[i]);
    }
    
    //判断是否应该留下
    let arr2 = [];
    for(let i=0;i<arr.length;i++){
        if(arr[i].length == num){
            arr2.push(arr[i]);
        }
        
    }
    //判断号码是否重复
    let arr3=[];
    for(let i=0;i<arr2.length;i++){
        if(!_this.isRepeat2(arr2[i])){
            arr3.push(arr2[i]);
        }
    }
    
    //判断每个项小于10的时候是不是有0
    let arr4 =[];
    for(let i=0;i<arr3.length;i++){
        arr3[i].count = 0;
        for(let j=0;j<num;j++){
            if(arr3[i][j]<=11&&arr3[i][j]>0){//当小于11
                if(arr3[i][j].indexOf('0')>-1 && arr3[i][j].length==2){//如果找到说明正常，啥都不用做
                    arr3[i].count++;
                }else{
                    break;
                }
            }
            //三次验证通过 格式无误
            if(arr3[i].count === num){
                arr4.push(arr3[i]);
            }
        }
    }
    console.log(arr4);
    return arr4;
}
//arr是包含两个数组的二维数组
//第一个数组length不超过2，不小于1
//第二个数组元素不能包含第一个数组元素
function renxuandantuo(arr,num){
    let _this = this;
    if(arr.length===2){
        let ar1 = arr[0];//胆码
        let ar2 = arr[1];//拖码
        let cha = num-ar1.length;
        let arm = _this.zuxuanpailieC(ar2,cha);
        for(let i=0;i<arm.length;i++){
            arm[i] = arm[i].concat(ar1);
        }
        return arm;
    }
    
}
function zuxuanHezhi2(arr, nBegin, nEnd){
    let array = [],
    _this = this;
   for (let i = 0; i < arr.length; i++) {
            var arm = [],
                arr2 = [],
                x, y;
                for (x = nBegin; x <= nEnd; x++) {
                    for (y = nBegin; y <= nEnd; y++) {
                        if (x + y  == arr[i] && _this.arrIndexOf(x, [x, y]) != 2) {
                            var postArray = [x, y].sort(function(a, b) {
                                return a - b;
                            });
                            if (_this.isRepeat(postArray.join(''), arm)) {
                                arm.push(postArray)
                                arr2.push([x, y]);
                            }
                        
                        }
                    }
                }
       array =array.concat(arr2);
    }
    return array;
}

//2个数的包胆
function baodan2(sum, nBegin, nEnd) {
    var arr = 0,
        checkArray = [],
        result=[],
        x, y,
        _this = this;

    for (x = nBegin; x <= nEnd; x++) {
        for (y = nBegin; y <= nEnd; y++) {
            if ((x == sum && y != sum) || (y == sum && x != sum)) {
                var postArray = [x, y].sort(function(a, b) {
                    return a - b;
                });
                if (_this.isRepeat(postArray.join(''), checkArray)) {
                    checkArray.push(postArray)
                        result.push([x, y]);
                    arr++;
                }
            }
        }
    }
    return result;
}
//3个数的包胆
function baodan3(sum, nBegin, nEnd) {
    var arr = 0,
        checkArray = [],
        x, y,z,
        result =[],
        _this = this;

    for (x = nBegin; x <= nEnd; x++) {
        for (y = nBegin; y <= nEnd; y++) {
            for (z = nBegin; z <= nEnd; z++) {
                if ((x == sum && y != sum && z != sum) || (x != sum && y == sum && z != sum)||(x != sum && y != sum && z == sum)) {
                    checkArray.push([x, y,z]);
                    var postArray = [x, y].sort(function(a, b) {
                        return a - b;
                    });
                    if (_this.isRepeat(postArray.join(''), checkArray)) {
                        checkArray.push(postArray);
                        result.push([x, y,z]);
                            //arr.push([x, y,z]);
                        arr++;
                    }
                }
            }
        }
    }
    return result;
}
function zuxuanHezhi3(arr, nBegin, nEnd){
    let array = [],
    _this = this;
   for (let i = 0; i < arr.length; i++) {
            var arm = [],
                arr2 = [],
                x, y, z;
                for (x = nBegin; x <= nEnd; x++) {
                    for (y = nBegin; y <= nEnd; y++) {
                        for (z = nBegin; z <= nEnd; z++) {
                            if (x + y + z == arr[i] && _this.arrIndexOf(x, [x, y, z]) != 3) {
                                var postArray = [x, y, z].sort(function(a, b) {
                                    return a - b;
                                });
                                if (_this.isRepeat(postArray.join(''), arm)) {
                                    arm.push(postArray)
                                    arr2.push([x, y, z]);
                                }
                            }
                        }
                    }
                }
       array =array.concat(arr2);
    }
    return array;
}
function isRepeat(data, array) {
    //检查重复
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i].join('') == data) {
            return false;
        }
    };
    return true;
}
//组选组3
function zuxuanzu3(ball){
    var that = this,
        len = ball[0].length,
        saveNum = [],
        checkNum = [],
        result = [],
        arr = [],
        nr = [];
    //获取选中数字 
    for (var i = 0; i < len; i++) {
        arr.push(ball[0][i]);
    }
    for (var c = 0; c < arr.length; c++) {
        checkNum = [];
        saveNum = arr.concat();
        checkNum.push([
            [arr[c], arr[c]].join('')
        ]);
        saveNum.splice(c, 1)
        checkNum.push(saveNum);
        result = result.concat(that.combination2(checkNum));
    };

    for (var k = 0; k < result.length; k++) {
        result[k] = result[k].join('').split('');
    };

    return result;
}
//组选1个三重号1个单号--四星组选4
function zuxuan3chongjia1(ball){
    var _this = this,
        len = ball[1].length,
        result = [],
        arr = [],
        arr2 = [];
    //获取选中数字 
    for (var i = 0; i < len; i++) {
        arr.push(ball[1][i]);
    }
    //存储单号组合
    arr2 = _this.zuxuanpailieC(arr, 1);
    //二重号组合
    for (var j = 0; j < ball[0].length; j++) {
        //加上单号各种组合
        for (var s = 0; s < arr2.length; s++) {
            if (_this.arrIndexOf(ball[0][j], arr2[s]) == -1) {
                result.push(arr2[s].concat([ball[0][j],ball[0][j], ball[0][j]]));
            }
        }
    }
return result;
}
//组选1个二重号2个单号--前四组选12
function zuxuan2chongjia2(ball){
    var _this = this,
        len = ball[1].length,
        result = [],
        arr = [],
        arr2 = [];
    //获取选中数字 
    for (var i = 0; i < len; i++) {
        arr.push(ball[1][i]);
    }
    //存储单号组合
    arr2 = _this.zuxuanpailieC(arr, 2);
    //二重号组合
    for (var j = 0; j < ball[0].length; j++) {
        //加上单号各种组合
        for (var s = 0; s < arr2.length; s++) {
            if (_this.arrIndexOf(ball[0][j], arr2[s]) == -1) {
                result.push(arr2[s].concat([ball[0][j], ball[0][j]]));
            }
        }
    }
return result;
}
//组选1个四重号1个单号，算法参考直选
function zuxuan4chongjia1(ball){
    var _this = this,
    len = ball[1].length,
    result = [],
    arr = [],
    arr2 = [];
    //获取选中数字 
    for (var i = 0; i < len; i++) {
        arr.push(ball[1][i]);
    }
    //存储单号组合
    arr2 = _this.zuxuanpailieC(arr, 1);
    //二重号组合
    for (var j = 0; j < ball[0].length; j++) {
        //加上单号各种组合
        for (var s = 0; s < arr2.length; s++) {
            if (_this.arrIndexOf(ball[0][j], arr2[s]) == -1) {
                result.push(arr2[s].concat([ball[0][j], ball[0][j], ball[0][j], ball[0][j]]));
            }
        }
    }
    return result;
}
//组选1个三重号1个二重号，算法参考直选
function zuxuan3chongjia2chong(ball){
    var _this = this,
        len = ball[1].length,
        result = [],
        arr = [],
        arr2 = [];
    //获取选中数字 
    for (var i = 0; i < len; i++) {
        arr.push(ball[1][i]);
    }
    //存储单号组合
    arr2 = _this.zuxuanpailieC(arr, 1);

    for (var c = 0; c < arr2.length; c++) {
        arr2[c] = [arr2[c][0], arr2[c][0]];
    }

    //二重号组合
    for (var j = 0; j < ball[0].length; j++) {
        //加上单号各种组合
        for (var s = 0; s < arr2.length; s++) {
            if (_this.arrIndexOf(ball[0][j], arr2[s]) == -1) {
                result.push(arr2[s].concat([ball[0][j], ball[0][j], ball[0][j]]));
            }
        }
    }
    return result;
}
//组选1个三重号2个单号
function zuxuan3chongjia2(ball){
    var _this = this,
        len = ball[1].length,
        result = [],
        arr = [],
        arr2 = [];
    //获取选中数字 
    for (var i = 0; i < len; i++) {
        arr.push(ball[1][i]);
    }
    //存储单号组合
    arr2 = _this.zuxuanpailieC(arr, 2);
    //二重号组合
    for (var j = 0; j < ball[0].length; j++) {
        //加上单号各种组合
        for (var s = 0; s < arr2.length; s++) {
            if (_this.arrIndexOf(ball[0][j], arr2[s]) == -1) {
                result.push(arr2[s].concat([ball[0][j], ball[0][j], ball[0][j]]));
            }
        }
    }
return result;
}
//组选两个2重号1个单号
function zuxuanliange2chongjia1(ball, noFilter) {
    var _this = this,
        len = ball[0].length,
        result = [],
        arr = [],
        arr2 = [];
    //获取选中数字 
    for (var i = 0; i < len; i++) {
        arr.push(ball[0][i]);
    }
    for (var c = 0; c < arr.length; c++) {
        arr[c] = [arr[c], arr[c]];
    }
    if (noFilter) {
        return _this.zuxuanpailieC(arr, 2);
    }
    //存储单号组合
    arr2 = _this.zuxuanpailieC(arr, 2);
    //二重号组合
    for (var j = 0; j < ball[1].length; j++) {
        //加上单号各种组合
        for (var s = 0; s < arr2.length; s++) {
            if (_this.arrIndexOf(ball[1][j], arr2[s]) == -1) {
                result.push(arr2[s].concat([ball[1][j]]));
            }
        }
    }
    return result;
}
//组选60
function zuxuan2chongjia3(ball){
    let len = ball[1].length,
        result = [],
        arr = [],
        arr2 = [];
    //获取选中数字 
    for (let i = 0; i < len; i++) {
        arr.push(ball[1][i]);
    }
    //存储单号组合
    arr2 = this.zuxuanpailieC(arr, 3);
    //二重号组合
    for (let j = 0; j < ball[0].length; j++) {
        //加上单号各种组合
        for (let s = 0; s < arr2.length; s++) {
            if (this.arrIndexOf(ball[0][j], arr2[s]) == -1) {
                result.push(arr2[s].concat([ball[0][j], ball[0][j]]));
            }
        }
    }
    return result;
}
//单行数组的排列组合
//list 参与排列的数组
//num 每组提取数量
//last 递归中间变量
function zuxuanpailieC(list, num, last) {
    var result = [],
        i = 0;
    last = last || [];
    if (num == 0) {
        return [last];
    }
    for (; i <= list.length - num; i++) {
        //console.log("循环",list.slice(i + 1), num - 1, last.slice(0).concat(list[i]));
        result = result.concat(this.zuxuanpailieC(list.slice(i + 1), num - 1, last.slice(0).concat(list[i])));
    }
    return result;
}
//获取数组里面的最大值
function getArrMax(arr){
    return Math.max.apply(null, arr)
}
//获取数组里面的最小值
function getArrMin(arr){
    return Math.min.apply(null, arr);
}
//直选跨度3
function zhixuankuadu3(arr,startNum,endNum){
    let array = [];
    for (let i = 0; i < arr.length; i++) {
        let arm = [],
                x, y, z;
            for (x = startNum; x <= endNum; x++) {
                for (y = startNum; y <= endNum; y++) {
                    for (z = startNum; z <= endNum; z++) {
                        let numList = [x, y, z];
                        let minNums = getArrMin(numList);
                        let maxNums = getArrMax(numList);
                        if (maxNums - minNums == arr[i]) {
                            arm.push(numList);
                        }
                    }
                }
            }
        array =array.concat(arm);
    }
    return array;
}
//直选跨度2
function zhixuankuadu2(arr,startNum,endNum){
    let array = [];
    for (let i = 0; i < arr.length; i++) {
            let arm = [],
                x, y;
            for (x = startNum; x <= endNum; x++) {
                for (y = startNum; y <= endNum; y++) {
                    if (y - x == arr[i]) {
                        arm.push([x, y]);
                        if (x != y) {
                            arm.push([y, x]);
                        }
                    }
                }
            }
            array =array.concat(arm);
    }
    return array;
}
//直选和值3
function  zhixuanHezhi3(arr,startNum,endNum){
    let array = [];
   for (let i = 0; i < arr.length; i++) {
            var arm = [],
                x, y, z;
            for (x = startNum; x <= endNum; x++) {
                for (y = startNum; y <= endNum; y++) {
                    for (z = startNum; z <= endNum; z++) {
                        if (x + y + z == arr[i]) {
                            arm.push([x, y, z]);
                        }
                    }
                    
                }
            }
       array =array.concat(arm);
    }
    return array;
}
//直选和值2
function  zhixuanHezhi2(arr,startNum,endNum){
    let array = [];
   for (let i = 0; i < arr.length; i++) {
            var arm = [],
                x, y;
            for (x = startNum; x <= endNum; x++) {
                for (y = startNum; y <= endNum; y++) {
                        if (x + y == arr[i]) {
                            arm.push([x, y]);
                        }
                    
                }
            }
       array =array.concat(arm);
    }
    return array;
}
//单式二星匹配
function danshierxing(arr){
    //分割投注项
    for(let i=0;i<arr.length;i++){
        arr[i] = arr[i].split(' ');
        arr[i] = clearStringkongArr(arr[i]);
    }
    //console.log(arr);
    //判断是否应该留下
    let arr2 = [];
    for(let i=0;i<arr.length;i++){
        if(arr[i].length == 2){
            arr2.push(arr[i]);
        }
        
    }
    //判断号码是否重复
    let arr3=[];
    for(let i=0;i<arr2.length;i++){
        if(arr2[i][0]!=arr2[i][1]){
            arr3.push(arr2[i]);
        }
    }
    //判断每个项小于10的时候是不是有0
    let arr4 =[];
    for(let i=0;i<arr3.length;i++){
        arr3[i].count = 0;
        for(let j=0;j<2;j++){
            if(arr3[i][j]<=10&&arr3[i][j]>0){//当小于10
                if(arr3[i][j].indexOf('0')>-1 && arr3[i][j].length==2){//如果找到说明正常，啥都不用做
                    arr3[i].count++;
                }else{
                    break;
                }
            }
            //三次验证通过 格式无误
            if(arr3[i].count === 2){
                arr4.push(arr3[i]);
            }
        }
    }
    return arr4;
}
//单式三星匹配
function danshisanxing(arr){
    //分割投注项
    for(let i=0;i<arr.length;i++){
        arr[i] = arr[i].split(' ');
        arr[i] = clearStringkongArr(arr[i]);
    }
    //console.log(arr);
    //判断是否应该留下
    let arr2 = [];
    for(let i=0;i<arr.length;i++){
        if(arr[i].length == 3){
            arr2.push(arr[i]);
        }
        
    }
    //判断号码是否重复
    let arr3=[];
    for(let i=0;i<arr2.length;i++){
        if(arr2[i][0]!=arr2[i][1]&&arr2[i][0]!=arr2[i][2]&&arr2[i][1]!=arr2[i][2]){
            arr3.push(arr2[i]);
        }
    }
    //判断每个项小于10的时候是不是有0
    let arr4 =[];
    for(let i=0;i<arr3.length;i++){
        arr3[i].count = 0;
        for(let j=0;j<3;j++){
            if(arr3[i][j]<=10&&arr3[i][j]>0){//当小于10
                if(arr3[i][j].indexOf('0')>-1 && arr3[i][j].length==2){//如果找到说明正常，啥都不用做
                    arr3[i].count++;
                }else{
                    break;
                }
            }
            //三次验证通过 格式无误
            if(arr3[i].count === 3){
                arr4.push(arr3[i]);
            }
        }
    }
    return arr4;
}
//清除数组为空字符串的项
function clearStringkongArr(arr){
    let arr2 =[];
    //清除空数组
    for(let i=0;i<arr.length;i++){
        if(arr[i]!==''&&arr[i]!==' '){
            arr2.push(arr[i]);
        }
    }

    return arr2;
}
//求和投注
function getsummation(betArr){
    let arr = [];
    for(let i=0;i<betArr.length;i++){
        if(betArr[i].length!=0){
            //console.log(betArr[i]);
            arr = arr.concat(betArr[i])
        }
    }
    return arr
}
//单行数组的排列组合
//1.list 参与排列的数组 
//2.num 每组提取数量
//3.last 递归中间变量
function extract(list, num, last) {
    var result = [],
        i = 0;
    last = last || [];
    if (num == 0) {
        return [last];
    }
    for (; i <= list.length - num; i++) {
        result = result.concat(extract(list.slice(i + 1), num - 1, last.slice(0).concat(list[i])));
    }
    return result;
}
//检查数组存在某数
function arrIndexOf(value, arr) {
    var r = 0;
    for (var s = 0; s < arr.length; s++) {
        if (arr[s] == value) {
            r += 1;
        }
    }
    return r || -1;
}
//二维数组的排列组合
//arr2 二维数组
function combination2(arr2){
    if (arr2.length < 1) {
        return [];
    }
    var w = arr2[0].length,
        h = arr2.length,
        i, j,
        m = [],
        n,
        result = [],
        _row = [];

    m[i = h] = 1;

    while (i--) {
        m[i] = m[i + 1] * arr2[i].length;
    }
    n = m[0];
    for (i = 0; i < n; i++) {
        _row = [];
        for (j = 0; j < h; j++) {
            _row[j] = arr2[j][~~(i % m[j] / m[j + 1])];
        }
        result[i] = _row;
    }
    return result;
}
function zhixuanfushi(arrs){
    let aaa = this.combination2(arrs);
    let arr = [];
    for(let i=aaa.length;i--;){
            arr.push(aaa[i])
    }
    return arr;
}
//精确复式3星
function jingquefushi3(arrs){
    let aaa = this.combination2(arrs);
    let arr = [];
    for(let i=aaa.length;i--;){
        if(aaa[i][0]!=aaa[i][1]&&aaa[i][0]!=aaa[i][2]&&aaa[i][1]!=aaa[i][2]){
            arr.push(aaa[i])
        }
        
    }
    return arr;
}
//精确复式2星
function jingquefushi2(arrs){
    let aaa = this.combination2(arrs);
    let arr = [];
    for(let i=aaa.length;i--;){
        if(aaa[i][0]!=aaa[i][1]){
            arr.push(aaa[i])
        }
        
    }
    return arr;
}
export default lottoryApi;
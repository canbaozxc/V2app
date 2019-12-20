import fly from "../dll/fly.js";
import {Message} from 'iview';
//const baseURL = 'https://www.easy-mock.com/mock';
const baseURL = 'http://1.09py.cn/';
// const baseURL = '';
/****************** ajax list start******************/
const api = {
    getVerification,
    login,
    regstered,
    getuserhave,
    getbettingRecordList,
    getlotteryClassList,
    getBettingDetail,
    getTraceDetail,
    getTeamLotteryProfits,
    getTeamLotteryProfitsDate,
    getlowlist,
    getRegisterLinks,//邀请码管理
    getRegisterLinkDetail,//邀请码详情
    deleteRegisterLink,//删除开户链接
    CreateRegisterLink,//创建开户链接
    getCurrentUserInfo,//拉取用户信息
    getAccount,//获取账户信息
    logout,//用户登出
    changeLoginPwd,//修改登录密码
    changeFundPwd,//修改资金密码
    getBankCardList,//获取银行卡列表
    checkBankCard,//验证银行卡信息
    getBankList,//获取系统银行卡列表
    bindBankCard,//绑定银行卡
    getTransactionTypeList,//获取帐变类型
    getGameMenu,//获取全部游戏
    getProjectList,//获取投注记录
    getProjectDetail,//获取投注详情，注单详情
    getTraceDetai,//追号详情
    getTraceList,//追号列表
    getTraceProjectDetail,//追号清单
    CancelTraceReserve,//取消本期追号
    getLotteryList,//获取彩种列表
    getTransactionList,//获取帐变记录
    getWithdrawalList,//获取提现申请
    getTeamLotteryProfits,//获取团队游戏盈亏
    getChildren,//获取下级用户
    getUsers,//获取下级用户列表    
    getSummary,//获取个人盈亏报表
    getPrizeGroupForCreate,//获取开户奖金组信息
    stopTrace,//终止追号
    getGameList,//获取游戏列表
    getIssueListForRefresh,//获取单项游戏倒计时
    deleteBankCard,//删除银行卡
    getGameSettingForBet,//获取游戏玩法等设置信息
    getGameSeries,//获取彩系列表
    setUserInfo,//设置个人信息
    getNoticeList,//获取系统公告列表
    getNoticeDetail,//获取公告详情
    getPrizeSet,//获取玩法奖金信息
    bet,//下注
    dropProject,//撤单
    getCurrentServerTime,//获取当前服务器时间
    getWithdrawalRules,//获取提现规则
    withdraw,//用户申请提现接口
};

/****************** ajax list end******************/
/****************** ajax function start******************/
function withdraw(pream){//撤单
    return _post('/service?action=withdraw',pream);
}
function getWithdrawalRules(){//撤单
    return _get('/service?action=getWithdrawalRules');
}
function getCurrentServerTime(){//获取当前服务器时间
    return _get('/service?action=getCurrentServerTime');
}
function dropProject(pream){//撤单
    return _post('/service?action=dropProject',pream);
}
function bet(pream){//追号清单
    return _post('/service?action=bet',pream);
}
function getPrizeSet(pream){//获取玩法奖金信息
    let strPream = turnGetParam(pream);
    return _get('/service?action=getPrizeSet',strPream);
}
function getNoticeList(){//获取系统公告列表
    return _get('/service?action=getNoticeList');
}
function getNoticeDetail(pream){//获取公告详情
    let strPream = turnGetParam(pream);
    return _get('/service?action=getNoticeDetail',strPream);
}

function setUserInfo(pream){//设置个人信息
    let strPream = turnGetParam(pream);
    return _get('/service?action=setUserInfo',strPream);
}
function regstered(pream){//注册
    //let strPream = turnGetParam(pream);
    return _post('/service?action=linkCreateUser',pream);
}
function getSummary(pream){//获取下级用户列表
    let strPream = turnGetParam(pream);
    return _get('/service?action=getSummary',strPream);
};
function getGameSettingForBet(pream){//获取游戏玩法等设置信息
    let strPream = turnGetParam(pream);
    return _get('/service?action=getGameSettingForBet',strPream);
}
function CreateRegisterLink(pream){//创建开户链接
    return _post('/service?action=CreateRegisterLink',pream);
}
function deleteBankCard(pream){//删除银行卡
    return _post('/service?action=deleteBankCard',pream);
}
function getIssueListForRefresh(pream){//获取单项游戏倒计时
    let strPream = turnGetParam(pream);
    return _get('/service?action=getIssueListForRefresh',strPream);
}
function getGameList(){//获取游戏列表
    return _get('/service?action=getGameList');
}
function stopTrace(pream){//终止追号
    return _post('/service?action=stopTrace',pream);
}
function getPrizeGroupForCreate(pream){//获取开户奖金组信息
    let strPream = turnGetParam(pream);
    return _get('/service?action=getPrizeGroupForCreate',strPream);
}
function getUsers(pream){//获取下级用户列表
    let strPream = turnGetParam(pream);
    return _get('/service?action=getUsers',strPream);
}
function getChildren(pream){//获取下级用户
    let strPream = turnGetParam(pream);
    return _get('/service?action=getChildren',strPream);
}
function getTeamLotteryProfits(pream){//获取团队游戏盈亏
    let strPream = turnGetParam(pream);
    return _get('/service?action=getTeamLotteryProfits',strPream);
}
function getWithdrawalList(pream){//获取提现申请
    let strPream = turnGetParam(pream);
    return _get('/service?action=getWithdrawalList',strPream);
}
function getTransactionList(pream){//获取帐变记录
    let strPream = turnGetParam(pream);
    return _get('/service?action=getTransactionList',strPream);
}
function getLotteryList(pream){//获取彩种列表
    let strPream = turnGetParam(pream);
    return _get('/service?action=getLotteryList',strPream);
}
function getGameSeries(pream){//获取彩系列表
    let strPream = turnGetParam(pream);
    return _get('/service?action=getGameSeries',strPream);
}
//取消本期追号CancelTraceReserve
function CancelTraceReserve(pream){//追号清单
    return _post('/service?action=CancelTraceReserve',pream);
}
function getTraceProjectDetail(pream){//追号清单
    let strPream = turnGetParam(pream);
    return _get('/service?action=getTraceProjectDetail',strPream);
}
function getTraceList(pream){//追号列表
    let strPream = turnGetParam(pream);
    return _get('/service?action=getTraceList',strPream);
}
function getTraceDetai(pream){//获取投注详情，注单详情
    let strPream = turnGetParam(pream);
    return _get('/service?action=getTraceDetail',strPream);
}
function getProjectDetail(pream){//获取投注详情，注单详情
    let strPream = turnGetParam(pream);
    return _get('/service?action=getProjectDetail',strPream);
}
function getProjectList(pream){//获取投注记录
    let strPream = turnGetParam(pream);
    return _get('/service?action=getProjectList',strPream);
}
function getGameMenu(pream){//获取游戏菜单
    let strPream = turnGetParam(pream);
    return _get('/service?action=getGameMenu',strPream);
}
function getTransactionTypeList(pream){//获取帐变类型
    let strPream = turnGetParam(pream);
    return _get('/service?action=getTransactionTypeList',strPream);
}
function bindBankCard(pream){//验证银行卡信息
    return _post('/service?action=bindBankCard',pream);
}
function getBankList(){//获取系统银行卡列表
    return _get('/service?action=getBankList')
}
function checkBankCard(pream){//验证银行卡信息
    return _post('/service?action=checkBankCard',pream)
}
function getBankCardList(){//获取银行卡列表
    return _get('/service?action=getBankCardList')
}
function login(pream){//登录
    let strPream = turnGetParam(pream);
    return _get('/service?action=Login',strPream);
}
function getVerification(){//获取验证码
    return _get('/service?action=getCaptcha')
}
function getRegisterLinks(){//邀请码管理
    return _get('/service?action=getRegisterLinks')
}
function getRegisterLinkDetail(pream){//获取注册码详情
    let strPream = turnGetParam(pream);
    return _get('/service?action=getRegisterLinkDetail',strPream)
}
function deleteRegisterLink(pream){//删除开户链接
    return _post('/service?action=deleteRegisterLink',pream)
}
function getCurrentUserInfo(){//拉取用户信息
    return _get('/service?action=getCurrentUserInfo');
}
function getAccount(){//获取账户信息
    return _get('/service?action=getAccount');
}
function logout(){//用户登出
    return _get("/service?action=logout");
}
function changeLoginPwd(pream){//修改登录密码
    let strPream = turnGetParam(pream);
    return _get("/service?action=changeLoginPwd",strPream);
}
function changeFundPwd(pream){//修改资金密码
    let strPream = turnGetParam(pream);
    return _get("/service?action=changeFundPwd",strPream);
}
function getuserhave() {
    return _get('/5ad6fee0d27d541368255cdb/example/mock_copy_1557142151510');
}
function getbettingRecordList(){//投注列表
    return _get('/5bcedeade67bcd5cf7f9701a/yinju/bettingRecordList');
}
function getlotteryClassList(){//彩种列表
    return _get('/5bcedeade67bcd5cf7f9701a/yinju/lotterylist');
}
function getBettingDetail(){//彩种列表
    return _get('/5bcedeade67bcd5cf7f9701a/yinju/getBettingDetail');
}
function getTraceDetail(){//获取追号详情
    return _get('/5bcedeade67bcd5cf7f9701a/yinju/getTraceDetail');
}

function getTeamLotteryProfitsDate(){//获取团队盈亏明细-日期
    return _get('/5bcedeade67bcd5cf7f9701a/yinju/getTeamLotteryProfitsDate');
}
function getlowlist(){//table测试
    return _get('/5bcedeade67bcd5cf7f9701a/yinju/lowlist');
}


/****************** ajax function end ******************/
export default api;
/****************** 内部方法 start ******************/
//get参数分割方法
function turnGetParam(pream){
    let str = "";
    for(let item in pream){
        str +=item+'='+pream[item]+'&';
    }
    return str
}
function _get(module,parameters) {
    return new Promise(resolve => {
        fly.get(baseURL +module , parameters).then(res => {
            resolve(res);
        }).catch(err => {
            console.log("请求服务器失败，请重试", err);
        })
    })
}

function _post(module, parameters) {
    return new Promise(resolve => {
        fly.post(baseURL + module, parameters).then(res => {
            resolve(res);
        }).catch(err => {
            console.log("请求服务器失败，请重试", err);
        })
    })
}

function _Ypost(module, methods, parameters) {
    return new Promise(resolve => {
        const msg = Message.loading({
            content: 'Loading...',
            duration: 0
        });
        fly.post(baseURL + module + '/' + methods, parameters).then(res => {
            resolve(res);
            msg();
        }).catch(err => {
            msg();
            console.log("请求服务器失败，请重试");
        })
    })
}

/****************** 内部方法 end ******************/
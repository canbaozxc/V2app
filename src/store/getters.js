/*******  getter  *******/

// export const isLogin = (state) =>{
//     if(!state.isLogin && sessionStorage.getItem("isLogin")){
//         state.isLogin = JSON.parse(sessionStorage.getItem('isLogin'));
//     }
//     return state.isLogin
// };
//
// export const storeInfo = state => state.storeInfo;
//
// export const count = state => state.count;
//
// export const readyMoneyList = () => [10, 50, 100, 500, 1000, 5000, 10000];
//
// export const gameUserInfo = (state) =>{
//     if(!state.gameUserInfo.username && sessionStorage.getItem("isLogin")){
//         state.gameUserInfo = JSON.parse(sessionStorage.getItem('gameUserInfo'));
//     }
//     return state.gameUserInfo
// };

export const getwebNav = state => state.webNav;
export const inconr = state => state.inconr;
export const getbankBindData = state => state.bankBindData;
export const getbankToken  = state => state.bank_token;
export const getteamGameProfitLossSeach  = state => state.teamGameProfitLossSeach;
export const getiflotteryText  = state => state.iflotteryText;
export const getisloading  = state => state.isloading;
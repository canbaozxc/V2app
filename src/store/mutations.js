/*******  mutation  *******/

export const setwebNav = (state, payload) => {
    state.webNav = payload
};
export const add = (state) => {
    state.inconr ++
};
export const setbankBindData = (state, payload) => {
    state.bankBindData = payload
};
export const setbankToken = (state, payload) => {
    state.bank_token = payload
};
export const setteamGameProfitLossSeach = (state, payload) => {
    state.teamGameProfitLossSeach = payload
};
export const setiflotteryText = (state, payload) => {
    state.iflotteryText = payload
};

export const setisloading = (state, payload) => {
    state.isloading = payload;
};
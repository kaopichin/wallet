import { BASEURL, fetch, post, patch, put ,get,DETELE} from './http.js'


export const BASICURL = BASEURL;

//地址
//创建一个新地址
export const creatAddress = data => post(`/api/v1/addresses`,data);
//获取地址列表
export const getAddressList = data => get('/api/v1/addresses');
//返回有关地址的有趣信息
export const addressInfo = data => get(`/api/v1/addresses/${data.address}`);

//钱包
//返回可用钱包的列表
export const walletList = data => get('/api/v1/wallets');
//创建新的或恢复现有的电子钱包
export const creatWallet = data => post('/api/v1/wallets',data);
//更新给定电子钱包的密码
export const updateWalletPwd = data => put(`/api/v1/wallets/${data.walletId}/password`, data);
//返回给定walletId标识的Wallet
export const getWalletId = data => get(`/api/v1/wallets/${data.walletId}`);
//更新由给定walletId标识的电子钱包
export const updateWalletId = data => put(`/api/v1/wallets/${data.walletId}`,data);
//删除给定的电子钱包及其所有帐户
export const delWallet = data => DETELE(`/api/v1/wallets/${data.walletId}`);
//充值
export const redemptions = data => post('/api/redemptions/ada',data);

//账号
//检索特定帐户
export const searchAccount = data => get(`/api/v1/wallets/${data.walletId}/accounts/${data.accountId}`);
//更新给定电子钱包的帐户
export const updateAccount = data => put(`/api/v1/wallets/${data.walletId}/accounts/${data.accountId}`,data);
//删除帐户
export const delAccount = data => DETELE(`/api/v1/wallets/${data.walletId}/accounts/${data.accountId}`,data);
//检索完整的帐户列表
export const searchAccountList = data => get(`/api/v1/wallets/${data.walletId}/accounts`);
//为给定的电子钱包创建一个新帐户
export const creatAccount = data => post(`/api/v1/wallets/${data.walletId}/accounts`,data);

//交易
//返回事务历史记录，即所有过去事务的列表
export const transactionList = data => get('/api/v1/transactions',data);
//生成从源到一个或多个目标地址的新事务
export const transactions = data => post('/api/v1/transactions',data);
//估算来自付款的费用
export const fees = data => post('/api/v1/transactions/fees',data);

//设置
//检索此节点的静态设置
export const searchNodeSet = data => get('/api/v1/node-settings');

//信息
//检索此节点的动态信息
export const searchNodeMsg = data => get('/api/v1/node-info');

//同步
export const sync = data => get('/api/settings/sync/progress');
import axios from 'axios';
import Cookies from 'js-cookie'

const Tokenkey = 'Admin -Token'
let base = 'https://admin.helpmake.cn';
//let base = 'https://shop5.helpmake.cn';
axios.defaults.withCredentials=false;

export const baseURL = base
//用户登录
export const login = params => { return axios.post(`${base}/signature/admin_login`, params).then(res => res.data); };
//修改用户密码
export const modifyUser = params => { return axios.post(`${base}/manager/modify_user`, params).then(res => res); };
// 分类管理API
//读取所有分类
export const getAllClassAPI = params => {return axios.get(`${base}/manager/all_classify`, {params}).then(res => res); }

//cookie设置
export function getToken(){
    return Cookies.get(TokenKey)
}

export function setToken(){
    return Cookies.set(TokenKey, token, { expires: 7, path: '/' })
}

export function removeToken(){
    return Cookies.remove(TokenKey, { path: '/' })
}
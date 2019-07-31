// 包含了多个接口请求的函数的模块,函数返回Promise

import ajax from "./ajax";

//注册接口,之后的接口请求函数都已req开头
export const reqRegister = (user) => ajax("/register",user, "POST" );//user是一个包含了所有用户信息的对象
//登陆接口
export const reqLogin = ({username, password}) => ajax("/login", {username, password}, "POST");

//更新用户接口
export const reqUpdateUser = (user) => ajax("/update", user, "POST");
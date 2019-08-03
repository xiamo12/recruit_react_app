// 包含多个reducer函数，根据老的state和指定的action返回新的state
//rudux是基于action的触发机制，通过dispatch对应的action来修改状态，而状态的修改又统一通过reducer来进行
import { combineReducers } from "redux";
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, REVEIVE_USER_LIST  } from "./action-types";
import { getRedirectTo } from "../utils";

const initUser = {
	username: "", //用户名
	type: "dashen",//用户类型。不需要初始化密码，因为密码不会被后台返回
	msg: "", //错误提示信息
	redirectTo: "" //定义一个需要自动重定向的路由路径
}

//产生user状态的reducer
function user(state=initUser, action){
	switch (action.type){
		case AUTH_SUCCESS: //data是user
			const { type,header } = action.data;
			return { ...action.data, redirectTo: getRedirectTo(type, header)} //成功的状态下重定向到主页面
		case ERROR_MSG:  //data是msg
			return { ...state, msg:action.data} //失败时返回失败信息
		case RECEIVE_USER: 
			return action.data //成功的状态下重定向到主页面
		case RESET_USER:  //重置用户，跳转到登陆界面
			return { ...initUser, msg:action.data} //失败时返回失败信息
		default:
			return state;
	}
}
//产生userlist状态的reducer
const initUserList = []
function userList(state=initUserList, action){
	switch(action.type){
		case REVEIVE_USER_LIST: //data为userList
		return action.data
		default:
		return state
	}
}

export default combineReducers({ user });

//向外暴露的项目结构{ user: {} }




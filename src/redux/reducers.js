// 包含多个reducer函数，根据老的state和指定的action返回新的state
//rudux是基于action的触发机制，通过dispatch对应的action来修改状态，而状态的修改又统一通过reducer来进行
import { combineReducers } from "redux";
import { 
	AUTH_SUCCESS, 
	ERROR_MSG, 
	RECEIVE_USER, 
	RESET_USER, 
	RECEIVE_USER_LIST,
	RECEIVE_MSG_LIST,
	RECEIVE_MSG,
	MSG_READ
	  } from "./action-types";
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
const initUserList = [];
function userList(state=initUserList, action){
	switch(action.type){
		case RECEIVE_USER_LIST: //data为userList
			return action.data
		default:
			return state
	}
}

//产生聊天状态的reducer
const initChat = {
	users: {}, //包含所有用户信息的对象；属性名：userid，属性值是：{username,header}
	chatMsgs: [], //当前用户所有message相关的数组
	unReadCount: 0 //总的未读数量
}
function chat(state=initChat, action){
	switch(action.type){
		case RECEIVE_MSG_LIST: //data: {users, chatMsgs}
			const { users, chatMsgs, userid } = action.data;
			return  {
				users,
				chatMsgs,
				unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to===userid ? 1 : 0), 0)
			}//return的结构必须是上述initChat的结构
		case RECEIVE_MSG: //返回的data是chatMsg
			const {chatMsg} = action.data; //之前这里的chatMsg写了{}，导致运行报错。什么时候该加{}，什么时候不加？？
			return {
				users: state.users,
				chatMsgs: [...state.chatMsgs, chatMsg],
				unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to===action.data.userid ? 1 : 0) //判断是不是别人发给我的消息
			}
		case MSG_READ:
			const {from, to, count} = action.data;
			state.chatMsgs.forEach(msg =>{
				if (msg.from===from&&msg.to===to&!msg.read) {
					msg.read = true
				}
			})
			return {
				users: state.users,
				chatMsgs: state.chatMsgs.map(msg => {
					if (msg.from === from&&msg.to===to&&!msg.read) { //需要更新
						return {...msg, read: true}
					}else{//不需要更新
						return msg
					}
				}),
				unReadCount: state.unReadCount - count				
			}
		default:
		return state;
	}
}
export default combineReducers({ user, userList, chat });

//向外暴露的项目结构{ user: {}, userList:[], chat:{} }




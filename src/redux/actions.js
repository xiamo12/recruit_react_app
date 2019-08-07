// 包含多个action creator：异步action【返回函数】和同步action【返回对象】
import io from 'socket.io-client';
import { 
	AUTH_SUCCESS, 
	ERROR_MSG, 
	RECEIVE_USER, 
	RESET_USER, 
	RECEIVE_USER_LIST,
	RECEIVE_MSG_LIST,
	RECEIVE_MSG
	} from "./action-types";
import { 
	reqRegister, 
	reqLogin, 
	reqUpdateUser, 
	reqUser, 
	reqUserList,
	reqChatMsgList,
	reqReadMsg,
	reqChatMsg } from "../api";


function initIO(dispatch, userid){ //userid是当前用户的id
	if (!io.socket) {
		io.socket = io('ws://localhost:4000');//连接服务器，得到与服务器的链接对象.创建该对象之后，保存对象
		io.socket.on("receiveMsg", function(chatMsg){//绑定监听，接收服务器发送的消息.服务端发过来的receiveMsg是chatMsg，因此这里接收chatMsg。io会给所有的客户端都发送消息。但我们只需要服务端给特定的客户端发送消息即可。
			console.log('客户端接收到服务器发送的消息',chatMsg)
			//只有当chatMsg是与当前用户相关的消息时，才去分发同步action保存消息
			if (userid === chatMsg.from || chatMsg.to === userid) {
				dispatch(receiveMsg(chatMsg))
			}
		}) //这段代码只需做一次就够了，因此可以把它封装成一个函数
	}
}

//获取消息列表数据的函数
async function getMsgList(dispatch, userid){ //此函数在用户登录成功时执行
	initIO(dispatch, userid); //连接服务器获取消息应该在getMsgList之前做
	const response = await reqChatMsgList();
	const result = response.data;
	if (result.code === 0) {
		const { users, chatMsgs } = result.data;
		//分发一个同步action
		dispatch(receiveMsgList({ users, chatMsgs }))
	}
}
//发送消息的异步action
export const sendMsg = ({from, to, content}) => {
	return dispatch => { //不需要async/await了
		console.log('客户端向服务器发送消息', {from, to, content});
		//通过socket发送消息
		io.socket.emit("sendMsg",{from, to, content})//把消息发给服务器端
	}
}
//授权成功的同步action，返回的是一个对象
const authsuccess = (user) => ({ type: AUTH_SUCCESS, data: user}); //无论注册成功还是登陆成功，要管理的信息都是user。
//错误提示信息的同步action,返回的是一个对象
const errormsg = (msg)=> ({ type: ERROR_MSG, data: msg});//action里必须要使用一个type字段来表示将要执行的动作，多数情况下type是字符串常量。
//action创建函数是生成action的函数。在redux里面，可以直接将action创建函数返回的结果传入dispatch里，来发起一个dispatch过程
//接收用户的同步action
const receiveUser = (user)=>({type: RECEIVE_USER, data: user});
//重置用户的同步action
export const resetUser = (msg)=>({type: RESET_USER, data: msg});
//接收用户列表的同步action
export const receiveUserList = (userList)=>({type: RECEIVE_USER_LIST, data: userList});
//接收消息列表的同步action
const receiveMsgList = ({ users, chatMsgs }) => ({type: RECEIVE_MSG_LIST, data: { users, chatMsgs }});
//接收一个消息的同步action
const receiveMsg = (chatMsg)=> ({type: RECEIVE_MSG, data:chatMsg})
//注册的异步action.此action返回的是一个函数
export const register = (user)=> {
	const { username, password, password2, type } = user;
	if (!username) {
		return errormsg("用户名需指定！")
	}else if(password !== password2) { //表单的前台验证：注册时如果两次密码不一致，返回一个errormsg的同步action。
		return errormsg("2次密码要一致！");
	}
	//通过上述判断，说明表单数据合法，返回一个ajax请求的异步action函数
	return async dispatch => {
		//发送注册的异步ajax请求
		const response = await reqRegister({ username, password, type });
		const result = response.data;//data数据包括code，data
		if (result.code === 0) {//注册成功
			getMsgList(dispatch, result.data._id); //注册成功调用获取消息列表
			//分发授权成功的同步action
			dispatch(authsuccess(result.data));//把action创建函数的结果直接传递给dispatch方法即可发起一次dispatch过程
		}else{//注册失败
			dispatch(errormsg(result.msg));
		}
	}
}
//登陆的异步action.此action返回的是一个函数
export const login = (user)=> {
	const { username, password } = user;
	if (!username) {
		return errormsg("用户名必须指定！")
	}else if(!password) { //表单的前台验证：注册时如果两次密码不一致，返回一个errormsg的同步action。
		return errormsg("密码必须指定");
	}
	return async dispatch => {
		//发送注册的异步ajax请求
		const response = await reqLogin(user);
		const result = response.data;//data数据包括code，data
		if (result.code === 0) {//登陆成功
			getMsgList(dispatch, result.data._id); //注册成功调用获取消息列表
			//分发授权成功的同步action
			dispatch(authsuccess(result.data));
		}else{//注册失败
			dispatch(errormsg(result.msg));
		}
	}
}
//更新用户状态的异步action。此action返回一个函数
export const updateUser = (user) =>{
	return async dispatch =>{
		const response = await reqUpdateUser(user);
		const result = response.data;
		if (result.code === 0) {//更新成功 :data,分发一个同步action
			dispatch(receiveUser(result.data));
		}else{//更新失败： msg
			dispatch(resetUser(result.msg));
		}
	}
}

//获取用户的异步action
export const getUser = () => {
	return async dispatch => {
		//执行异步ajax请求
		const response = await reqUser(); //reqUser()是一个ajax请求，请求结果包括{code: xx, data:{}}
		const result = response.data;
		if (result.code === 0) {
			getMsgList(dispatch, result.data._id); //注册成功调用获取消息列表
			//成功获取数据
			dispatch(receiveUser(result.data));
		}else{
			//获取数据失败
			dispatch(resetUser(result.msg))
		}
	}
}

//获取用户列表的异步action
export const getUserList = (type)=>{
	return async dispatch =>{
		//执行异步ajax请求
		const response = await reqUserList(type);
		const result = response.data;
		//得到结果之后分发一个同步action
		if (result.code === 0) {
			dispatch(receiveUserList(result.data));
		}
	}
}























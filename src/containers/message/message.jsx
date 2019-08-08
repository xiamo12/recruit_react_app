import React, {Component} from "react";
import { connect } from "react-redux";
import { List, Badge } from "antd-mobile"

const Item = List.Item;
const Brief = Item.Brief
//消息界面路由容器



function getLastMsgs(chatMsgs, userid){
	//功能函数：根据与某个人聊天的chat_id,对chatMsgs进行分组，
	//得到每个组的lastMsg组成的数组
	//1.找出每个聊天的lastMsg，并用一个对象容器来保存{chat_id:lastMsg}
	const lastMsgObjs = {} //准备一个空容器
	chatMsgs.forEach(msg => {
		//往msg上加unReadCount属性。unReadCount是别人发给“我”的未读消息
		
		//对mdg的个体进行统计
		if (msg.to === userid && !msg.read) {
			msg.unReadCount = 1
		}else{
			msg.unReadCount = 0
		}


		const chatId = msg.chat_id; //得到msg聊天标识id
		const lastMsg = lastMsgObjs[chatId];//获取已保存的当前组件的lastMsg
		if (!lastMsg) {//当前msg就是所在组的lastMsg
			lastMsgObjs[chatId] = msg
		}else{//如果msg比lastMsg晚，就讲msg保存为lastMsg
			//累加unReadCount = 已经统计的 + 当前msg的
			const unReadCount = lastMsg.unReadCount + msg.unReadCount;
			if (msg.create_time > lastMsg.create_time) {
				lastMsgObjs[chatId] = msg; //将msg赋值给lastMsg之后，要关联到lastMsgObjs中
			}
			//累加unReadCount，并保存在最新的lastMsg上:lastMsgObjs[chatId]表示罪行的lastMsg
			lastMsgObjs[chatId].unReadCount = unReadCount
		}
	})
	//2.得到所有lastMsg的数组
	const lastMsgs = Object.values(lastMsgObjs)//values返回的数组指定是哪个对象
	//3.对数组根据create_time进行降序排序
	lastMsgs.sort(function(m1,m2){//传入sort一个排序函数，如果结果小于0，将m1放在前面；为0顺序不变；大于0m2在前面
		return  m2.create_time - m1.create_time; //如果此值小于0，那么m1在前面
	})
	console.log(lastMsgs)
	return lastMsgs
}


class Message extends Component{
	render(){
		const { user } = this.props; //user是“我”
		const { users, chatMsgs } =this.props.chat; //“users”
		const lastMsgs = getLastMsgs(chatMsgs, user._id)


		return (
			<List style={{marginTop: 50}}>
			{
				lastMsgs.map(msg => {
					//得到目标用户id
					const targetUserId = msg.to === user._id ? msg.from : msg.to;
					//得到目标用户的信息
					const targetUser = users[targetUserId]
					return (
					<Item 
						key={msg._id}
						extra={<Badge text={msg.unReadCount} />}
						thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null} 
						arrow="horizontal"
						onClick={ ()=> this.props.history.push(`/chat/${targetUserId}`)}>
						{msg.content}
						<Brief>{targetUser.username}</Brief>
					</Item>
					)
				})
			}
			</List>
			)
	}
}

export default connect(
	state => ({user:state.user, chat:state.chat}), //需要的数据：当前用户名，当前聊天信息
	{}
	)(Message)
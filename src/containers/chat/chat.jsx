import React, {Component} from "react";
import { connect } from "react-redux";
import { NavBar, List, InputItem, Grid } from "antd-mobile";
import '../../assets/css/index.less';
import { sendMsg } from "../../redux/actions";

const Item = List.Item;

//聊天界面路由容器
class Chat extends Component{
	state = {
		content: '',
		isShow: false
	}

	componentWillMount(){ //在第一次render执行之前回调，在此初始化表情列表数据
		const emojis = [😉, 😊, 😇, 🥰, 😍, 🤩, 😘, 😗, 😚, 😙,😋, 😛] //要求该数组里的元素是对象，对象有一个text属性，text属性的值是表情。
		this.emojis = emojis.map(emoji => ({text: emoji}))

	}


	handleSend = ()=>{ //需要content、from、to三个信息
		const from = this.props.user._id;
		const to = this.props.match.params.userid;
		const content = this.state.content.trim()
		//发送请求（发消息）
		if (content) {
			this.props.sendMsg({from, to, content});
		}
		//清除输入数据
		this.setState({content: ''})
	}
	render(){
		const { user } = this.props;
		const { users, chatMsgs } = this.props.chat //此处chatMsgs 包含的是“我”和所有列表用户的聊天记录，而需要的只是和当前用户的聊天记录，因此需要对chatMsgs进行过滤，过滤根据chat_id来过滤
		//计算当前聊天的chat_id
		const meId = user._id; //用户端的id

		if (!users[meId]) {//如果还没有获取到数据，就不做任何显示。users一定用户值，chatMsgs可能没值
			return null
		}
		
		const targetId = this.props.match.params.userid //当前目标的id
		const chatId = [targetId, meId].sort().join('_')

		//对chatMsg进行过滤
		const msgs = chatMsgs.filter(msg => msg.chat_id === chatId);//msgs可能是我发给对方，也可能是对方发给我
		
		//得到目标用户头像header图片对象
		const targetHeader = users[targetId].header; //users初始值是空对象
		const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null;
		return (
			<div id="chat-page">
				<NavBar>aa</NavBar>
				<List>
			{msgs.map(msg => {
					if (targetId === msg.from) { //对方发消息过来,返回左边的标签
						return <Item key={msg._id} thumb={targetIcon} >{msg.content}</Item>//头像只需要加载一次就行了
					}else{ //此端发消息,返回右边的标签
						return <Item key={msg._id} className="chat-me" extra='我'>{msg.content}</Item>
					}
				})}
				</List>
				<div className="am-tab-bar">
				<InputItem 
				placeholder="请输入" 
				value={this.state.content}
				onChange={val => this.setState({content: val})}
				extra={
					<span>
						<span>😍</span>
						<span onClick={this.handleSend}>发送</span>
					</span>} />
				</div>
			</div>
			)
	}
}

export default connect(
	state => ({user: state.user, chat:state.chat}),
	{sendMsg}
	)(Chat)
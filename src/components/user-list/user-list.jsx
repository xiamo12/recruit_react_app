//显示指定用户列表的UI组件
//需要接收一个user-list对象
import React, { Component } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { 
	WingBlank, 
	WhiteSpace,
	Card } from "antd-mobile";

import QueueAnim from "rc-queue-anim";

const Header = Card.Header;
const Body = Card.Body;

class UserList extends Component{
	static propTypes = {
		userList: PropTypes.array.isRequired //对Component的props属性作类型检查
	}
	render(){
		const { userList } =this.props;
		//当type为dashen时，返回数据对象{config,data,headers...}等，其中data:{_id:"",username:"",type:"",header:"",info:"",post:""}
		return (<WingBlank style={{marginBottom: 50, marginTop: 40}}>
			<QueueAnim>
				{ userList.map(user => (
				<div key={user._id}>
					<WhiteSpace />
					<Card onClick={()=>this.props.history.push(`/chat/${user._id}`)}>
						<Header thumb={user.header ? require(`../../assets/images/${user.header}.png`) : null} extra={user.username}></Header>
						<Body>
							<div>职位：{user.post}</div>
							{user.company ? <div>公司：{user.company}</div> : null}
							{user.salary ? <div>月薪：{user.salary}</div> : null}
							<div>描述：{user.info}</div>
						</Body>
					</Card>
				</div>
				)
			)}
			</QueueAnim>
			</WingBlank>
			)
	}
}

export default withRouter(UserList)











// 大神信息完善的路由容器组件

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateUser } from "../../redux/actions";
import { 
	NavBar, 
	InputItem, 
	TextareaItem,
	Button } from "antd-mobile";
import HeaderSelector from "../../components/header-selector/header-selector"

class DashenInfo extends Component{
	state = {
		header: '',
		post: '',
		info: '',
	}
	handleChange = (name, value)=>{
		this.setState({
			[name]: value //注意：要获取的不是name，而是name的值，所以用中括号
		})
	}

	save = ()=>{
		this.props.updateUser(this.state);
	}

	setHeader = (header) => {
		this.setState({
			header
		})
	}
	render(){
		//如果信息已经完善，自动重定向到对应的主界面
		const { header, type } = this.props.user;
		if (header) {//说明信息已经完善
			const path = type === "dashen" ? "/dashen" : "/laoban";
			return <Redirect to={path}/>
		}
		//如果不满足上述条件，则执行下面的return
		return (
			<div>
				<NavBar>大神信息完善</NavBar>
				<HeaderSelector setHeader={this.setHeader}/>
				<InputItem placeholder="请输入求职岗位：" onChange={val => {this.handleChange("post",val)}}>求职岗位：</InputItem>
				<TextareaItem title="个人介绍：" rows={3} onChange={val => {this.handleChange("info",val)}} placeholder="请输入个人介绍："/>
				<Button type="primary" onClick={this.save}>保存</Button>
			</div>
		)
	}
}

//最后将它包装成容器组件
export default connect(
	state =>({user: state.user}),
	{ updateUser } //放置action
	)(DashenInfo);



//个人中心界面路由容器
import React, {Component} from "react";
import { connect } from "react-redux";
import { Result, List, Button, WhiteSpace, Modal } from "antd-mobile"; //Model组件不是标签，是一个对象，这个对象有一个alert方法
import Cookies from "js-cookie";
import { resetUser } from "../../redux/actions"
const Item = List.Item;
const Brief = Item.Brief;



class Personal extends Component{
	logOut = ()=>{
		Modal.alert("退出", "确认退出登录吗？", [
			{
				text: "取消",
			},
			{
				text: "确认",
				onPress : ()=>{
					//移除cookie中的userid
					Cookies.remove("userid");
					//移除redux里管理的userid
					this.props.resetUser()

				}
			}])

	}
	render(){
		const { username, header, company, post, salary, info } = this.props.user
		return (
			<div>
				<Result 
					img={<img src={require(`../../assets/images/${header}.png`)} style={{width:50}} alt="header"/>} 
					title={username}
					message={company} 
				/>

				<List renderHeader={ ()=> "相关信息" }>
					<Item multipleLine> 
						<Brief>职位：{post}</Brief>
						<Brief>简介：{info}</Brief>
						{salary ? <Brief>薪资：{salary}</Brief> : null}
					</Item>
				</List>
				<WhiteSpace/>
				<List>
					<Button type="warning" onClick={this.logOut}>退出登录</Button>
				</List>
			</div>)
	}
}

export default connect(
	state => ({user: state.user}),
	{ resetUser }
	)(Personal)
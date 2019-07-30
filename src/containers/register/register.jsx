// 注册路由组件

import React,{ Component } from "react";
import Logo from "../../components/logo/logo"
import { 
	NavBar, 
	WingBlank, 
	WhiteSpace,
	List, 
	InputItem,
	Radio,
	Button } from "antd-mobile";

	const ListItem = List.Item;


class Register extends Component{
	state = {
		username: "", //用户名
		password: "", //密码
		password2: "", //确认密码
		type: "dashen" //用户类型
	}
	register = ()=>{
		console.log(this.state)
	}


	//处理输入数据的改变，更新对应的状态
	handleChange = (name,val)=>{
		this.setState({
			[name] : val //属性名不是name，而是name的值。用中括号装起来，它就是一个变量，否则是一个字符串。
		})
	}

	toLogin = ()=>{
		this.props.history.replace('/login');
	}


	render(){
		const { type } = this.state;
		return <div>
			<NavBar>夏&nbsp;末</NavBar>
			<Logo />
			<WingBlank>
			<WhiteSpace/>
				<List>
					<InputItem placeholder="请输入用户名" onChange={ val =>{this.handleChange("username", val)} }>用户名：</InputItem>
					<InputItem placeholder="请输入密码" type="password" onChange={ val =>{this.handleChange("password", val)} }>密&nbsp;&nbsp;&nbsp;码：</InputItem>
					<InputItem placeholder="校验密码" type="password" onChange={ val =>{this.handleChange("password2", val)} }>确认密码：</InputItem>
					<ListItem>
						<span>用户类型：&nbsp;&nbsp;</span>
						<Radio checked={type === "dashen"} onClick={()=>this.handleChange("type","dashen")}>大神
						&nbsp;&nbsp;&nbsp;</Radio>
						<Radio checked={type === "laoban"} onClick={()=>this.handleChange("type","laoban")}>老板</Radio>
					</ListItem>
					<WhiteSpace/>
					<Button type="primary" onClick={this.register}>注册</Button>
					<Button onClick={this.toLogin}>已有账户</Button>
				</List>
			</WingBlank>
		</div>
	}
}

export default Register;
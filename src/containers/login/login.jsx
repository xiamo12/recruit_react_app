// 登陆路由组件

import React,{ Component } from "react";
import Logo from "../../components/logo/logo"
import { 
	NavBar, 
	WingBlank, 
	WhiteSpace,
	List, 
	InputItem,
	Button } from "antd-mobile";

	const ListItem = List.Item;


class Login extends Component{
	state = {
		username: "", //用户名
		password: "", //密码
	}
	login = ()=>{
		console.log(this.state)
	}


	//处理输入数据的改变，更新对应的状态
	handleChange = (name,val)=>{
		this.setState({
			[name] : val //属性名不是name，而是name的值。用中括号装起来，它就是一个变量，否则是一个字符串。
		})
	}

	toRegister = ()=>{
		this.props.history.replace('/register');
	}


	render(){
		return <div>
			<NavBar>夏&nbsp;末</NavBar>
			<Logo />
			<WingBlank>
			<WhiteSpace/>
				<List>
					<InputItem placeholder="请输入用户名" onChange={ val =>{this.handleChange("username", val)} }>用户名：</InputItem>
					<InputItem placeholder="请输入密码" type="password" onChange={ val =>{this.handleChange("password", val)} }>密&nbsp;&nbsp;&nbsp;码：</InputItem>
					<WhiteSpace/>
					<Button onClick={this.login} type="primary" >登陆</Button>
					<Button onClick={this.toRegister}>还没有账户</Button>
				</List>
			</WingBlank>
		</div>
	}
}

export default Login;
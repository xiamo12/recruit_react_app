// 登陆路由组件

import React,{ Component } from "react";
import Logo from "../../components/logo/logo"
import { connect } from "react-redux";
import { login } from "../../redux/actions";
import { Redirect } from "react-router-dom"; //渲染Redirect标签可实现自动重定向
import { 
	NavBar, 
	WingBlank, 
	WhiteSpace,
	List, 
	InputItem,
	Button } from "antd-mobile";


class Login extends Component{
	state = {
		username: "", //用户名
		password: "", //密码
	}
	login = ()=>{
		this.props.login(this.state);
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
     const { msg, redirectTo } = this.props.user;
     if (redirectTo) {
      return <Redirect to={redirectTo}></Redirect>
    }
		return <div>
			<NavBar>夏&nbsp;末</NavBar>
			<Logo />
			 {msg ? <div className="error-msg">{msg}</div> : null}
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

export default connect( //包装容器组件，传入注册函数register
  state => ({user: state.user}), //{}里指定要传的数据。组件读取状态值，当注册成功时成功跳转；失败时在注册列表上方出现提示信息。
  {login} //向UI组件Register传递了一个register函数
  )(Login);
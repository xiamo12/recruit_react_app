// 注册路由组件

import React,{ Component } from "react";
import { 
  NavBar, 
  WingBlank, 
  WhiteSpace,
  List, 
  InputItem,
  Radio,
  Button } from "antd-mobile";

import { connect } from "react-redux";
import {register} from "../../redux/actions";
import Logo from "../../components/logo/logo";
import { Redirect } from "react-router-dom"; //渲染Redirect标签可实现自动重定向

const ListItem = List.Item;

class Register extends Component{ //Register组件是一个UI组件，不能直接跟redux进行交互
  state = {
    username: "", //用户名
    password: "", //密码
    password2: "", //确认密码
    type: "dashen" //用户类型
  }
  //点击注册调用
  register = ()=>{
    // console.log(this.state)
    this.props.register(this.state)//包含了四个数据。
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
    const { msg, redirectTo } = this.props.user;
    //如果redirectTo有值，则需要重定向到指定的地址中去
    if (redirectTo) {
      return <Redirect to={redirectTo}></Redirect>
    }
    return <div>
      <NavBar>夏&nbsp;末</NavBar>
      <Logo />
      <WingBlank>
      <WhiteSpace/>
        <List>
        {msg ? <div className="error-msg">{msg}</div> : null}
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

export default connect( //包装容器组件，传入注册函数register
  state => ({user: state.user}), //{}里指定要传的数据。组件读取状态值，当注册成功时成功跳转；失败时在注册列表上方出现提示信息。
  {register} //向UI组件Register传递了一个register函数
  )(Register);


// export default Register;



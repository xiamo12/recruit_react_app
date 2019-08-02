// 主界面路由组件

import React,{ Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DashenInfo from "../dashen-info/dashen-info.jsx";
import LaobanInfo from "../laoban-info/laoban-info.jsx";
import { connect } from "react-redux";


class Main extends Component{
	render(){
		//读取cookie中userid


		//如果没有，自动重定向到登陆界面
		//如果有，读取redux中的user状态。


		//如果redux中user状态里没有_id，不能跳转登陆界面，而是返回一个null，不做任何显示
		//如果redux中user状态里有_id，显示对应的界面
		//如果请求根路径，就根据type和header来计算出一个重定向的路径，自动重定向








		//检查用户是否登陆，如果没有，自动重定向到登陆界面
		// const { user } = this.props;
		// if (!user._id) {
		// 	return <Redirect to='/login'/>
		// }
		return <div>
			<Switch>
				<Route path="/dasheninfo" component={ DashenInfo } />
				<Route path="/laobaninfo" component={ LaobanInfo } />
			</Switch>
		</div>
	}
}

export default connect(
	state => ({user: state.user})
	)(Main)


//1.实现自动登录。如果cookie中有userid，发请求获取对应的user，暂时不做任何显示
//2.如果cookie中没有userid，就进入login界面。
//3.如果已经登陆了，那么是进入完善信息的路由，还是进入主界面路由。
//如果请求根路径，就根据type和header来计算出一个重定向的路径，自动重定向



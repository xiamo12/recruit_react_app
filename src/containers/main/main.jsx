// 主界面路由组件

import React,{ Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getRedirectTo } from "../../utils";
import { getUser } from "../../redux/actions";

import DashenInfo from "../dashen-info/dashen-info.jsx";
import LaobanInfo from "../laoban-info/laoban-info.jsx";
import Dashen from "../dashen/dashen";
import Laoban from "../laoban/laoban";
import Message from "../message/message";
import Personal from "../personal/personal";
import NotFound from "../../components/not-found/not-found";
import NavFooter from "../../components/nav-footer/nav-footer";

import Cookies  from "js-cookie";
import { NavBar } from "antd-mobile";
import Chat from "../chat/chat";



class Main extends Component{
	//不加static是给组件对象添加属性，加static是给组件类添加属性
	navList = [ //包含所有导航组件的相关数据信息。
	{
		path: "/laoban",
		component: Laoban,
		title: "大神列表",
		icon: "dashen", //
		text: "大神"
	},
	{
		path:"/dashen",
		component: Dashen,
		title: "老板列表",
		icon: "laoban",
		text: "老板"
	},
	{
		path: "/message",
		component: Message,
		title:"消息列表",
		icon: "message",
		text: "消息"
	},
	{
		path: "/personal",
		component: Personal,
		title: "用户中心",
		icon: "personal",
		text: "个人"
	}
	]
	//如果登陆过【cookie中有userid】，但还没有登陆【redux管理的user中没有_id】，
	//则发请求获取对应的user【用componentDidMount生命周期函数来实现】，
	componentDidMount(){
		const userid = Cookies.get('userid');
		const { _id } = this.props.user;
		if (userid && !_id) { //登陆过，所以有userid；现在没有登陆，所以没有_id
			//发送异步请求，获取user【先写ajax->再写redux->再写这个组件】
			this.props.getUser() //不需要传入参数
		}
	}

	render(){
		//读取cookie中userid
		const userid = Cookies.get('userid');
		//如果没有，自动重定向到登陆界面
		if (!userid) {
			return <Redirect to="/login" />
		}
		//如果有，读取redux中的user状态。读取unReadCount状态，用于底部未读信息的显示
		const { user, unReadCount } = this.props;
		//如果redux中user状态里没有_id，不能跳转登陆界面，而是返回一个null，不做任何显示
		if (!user._id) {
			return null
		}else{//如果redux中user状态里有_id，显示对应的界面
			let path = this.props.location.pathname;
			if (path === '/') {//如果请求根路径，就根据type和header来计算出一个重定向的路径，自动重定向
				//得到一个重定向的路由路径
				path = getRedirectTo(user.type, user.header);
				return <Redirect to={path} />
			}
		}
		
		const  { navList }= this;
		const path = this.props.location.pathname;//请求的路径
		const currentNav = navList.find(nav => nav.path === path) //数组查找元素用find()方法.navList当中的每一个元素都是一个nav，我们需要对比nav下的path是不是等于当前的path 
		//find()中如果为true，得到首个匹配项。


		if (currentNav) {
			//决定哪个路由需要隐藏
			if (user.type === "laoban") {
				//隐藏“dashen”，也就是数组的第二个元素
				navList[1].hide = true;
			}else{
				navList[0].hide = true;
			}
		}
		


		return (<div>
					{ currentNav ? <NavBar className="sticky-header">{ currentNav.title }</NavBar> : null}
					<Switch>
					{
						navList.map(nav => <Route path={nav.path} component={nav.component} key={nav.path}/>) //映射了四个路由
					}
						<Route path="/dasheninfo" component={ DashenInfo } />
						<Route path="/laobaninfo" component={ LaobanInfo } />
						<Route path="/chat/:userid" component={ Chat } />
						<Route component={ NotFound } />
					</Switch>
					{ currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}/>: null} {/*底部导航单独抽取出来。*/}
				</div>)
	}
}

export default connect(
	state => ({user: state.user, unReadCount: state.chat.unReadCount}),
	{ getUser } //将getUser传到当前的UI组件
	)(Main)

/*
实现自动登录。
1. componentDidMount()
	如果登陆过【cookie中有userid】，但还没有登陆【redux管理的user中没有_id】，则发请求获取对应的user
2. render()
	如果cookie中没有userid，就重定向到login界面;
	判断redux管理的user中，是否有_id。如果没有，暂时不做任何显示;
	如果有_id，说明已经登陆，显示对应的界面;
	如果已经登陆了，那么是进入完善信息的路由，还是进入主界面路由;
	如果请求根路径，就根据type和header来计算出一个重定向的路径，自动重定向
*/


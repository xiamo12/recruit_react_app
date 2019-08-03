import React, { Component } from "react";
import { TabBar } from "antd-mobile";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const Item = TabBar.Item

//底部容器
class NavFooter extends Component{
	static propTypes = {
		navList: PropTypes.array.isRequired
	}
	render(){
		let { navList } = this.props;
		//过滤掉hide为true的nav
		navList = navList.filter(nav => !nav.hide)
		const path = this.props.location.pathname; //路由组件才有这个写法，这个组件是路由组件，因此path不能用这个方式获取
		//希望在非路由组件中使用路由库的api，可以使用路由组件库的一个函数withRoute()，
		//对当前组件进行包装，返回包装后的组件
		return (
			<TabBar className="am-tab-bar">{ navList.map((nav) => (
				<Item   key={nav.path}
						title={nav.text}
						icon={{uri:require(`./images/${nav.icon}.png`)}} 
						//第一层{}表示要写js表达式，第二层{}表示要写对象，``表示写的是一个模版字符串
						selectedIcon={{uri:require(`./images/${nav.icon}-selected.png`)}}
						selected={ path === nav.path}
						onPress={()=>this.props.history.replace(nav.path)}
						tabBarPosition="bottom"></Item>
				)
			)
		}</TabBar>)
	}
}

//内部会向组件中传入一些路由组件特有的属性：history/location/math
export default withRouter(NavFooter); //向外暴露withRouter()包装产生的组件
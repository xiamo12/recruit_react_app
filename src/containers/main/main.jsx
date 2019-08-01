// 主界面路由组件

import React,{ Component } from "react";
import { Switch, Route } from "react-router-dom";
import DashenInfo from "../dashen-info/dashen-info.jsx";
import LaobanInfo from "../laoban-info/laoban-info.jsx";


class Main extends Component{
	render(){
		return <div>
			<Switch>
				<Route path="/dasheninfo" component={ DashenInfo } />
				<Route path="/laobaninfo" component={ LaobanInfo } />
			</Switch>
		</div>
	}
}

export default Main;
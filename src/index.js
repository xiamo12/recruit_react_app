//入口js文件

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch} from "react-router-dom";
import Register from "./containers/register/register";
import Main from "./containers/main/main";
import Login from "./containers/login/login";


ReactDOM.render((
	<HashRouter>
		<Switch>
			<Route path="/register" component={ Register }></Route>{/*当路径为/register时请求Register组件*/}
			<Route path="/login" component={ Login }></Route>{/*当路径为/login时请求Login组件*/}
			<Route component={ Main }></Route>{/*没有指定main的路径，那么所有不是上述路径的路由都会先请求main组件，再经过它去请求下一级组件*/}
		</Switch>
	</HashRouter>
	), document.getElementById("root"));
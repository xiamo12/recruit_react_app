//入口js文件

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch} from "react-router-dom"; //引入路由
import Register from "./containers/register/register";
import Main from "./containers/main/main";
import Login from "./containers/login/login";

import { Provider } from "react-redux"; //引入redux
import store from "./redux/store";
// import { PropTypes } from "prop-types";

import "./assets/css/index.less"; //有两个子组件都需要这个样式，所以写在这里。
// import "./test/socketio_test"; //项目入口文件引入

//Provider组件只是一个普通的组件。
//它只需要接受store属性作为参数。它可以作为一个顶层的app容器，将state分发给下面所有被connect的组件。
ReactDOM.render((
	<Provider store={store}>
		<HashRouter>
			<Switch>
				<Route path="/register" component={ Register }></Route>{/*当路径为/register时请求Register组件*/}
				<Route path="/login" component={ Login }></Route>{/*当路径为/login时请求Login组件*/}
				<Route component={ Main }></Route>{/*没有指定main的路径，那么所有不是上述路径的路由都会先请求main组件，再经过它去请求下一级组件*/}
			</Switch>
		</HashRouter>
	</Provider>
	), document.getElementById("root"));
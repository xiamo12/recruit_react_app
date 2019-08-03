//404页面，找不到页面的时候返回到这里。

import React, {Component} from "react";
import { Button } from "antd-mobile";

//404界面
export default class NotFound extends Component{
	render(){
		return (
			<div>
				<div>
					<h2>抱歉，找不到该页面！</h2>
					<Button type="primary" 
					onClick={ ()=>this.props.history.replace('/') }>回到首页</Button>
				</div>
			</div>
			)
	}
}

import React, {Component} from "react";
import { connect } from "react-redux";

//消息界面路由容器
class Message extends Component{
	render(){
		return (
			<div>Message</div>
			)
	}
}

export default connect(
	state => ({}),
	{}
	)(Message)
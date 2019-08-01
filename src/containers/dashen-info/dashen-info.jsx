// 大神信息完善的路由容器组件

import React, { Component } from "react";
import { connect } from "react-redux";
class DashenInfo extends Component{
	render(){
		return (
			<div>DashenInfo</div>
		)
	}
}

//最后将它包装成容器组件
export default connect(
	state =>({}),
	{} //放置action
	)(DashenInfo);
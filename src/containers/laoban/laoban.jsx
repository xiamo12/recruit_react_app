import React, {Component} from "react";
import { connect } from "react-redux";

//老板主界面路由容器
class Laoban extends Component{
	render(){
		return (
			<div>Laoban</div>
			)
	}
}

export default connect(
	state => ({}),
	{}
	)(Laoban)
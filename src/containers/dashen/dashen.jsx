import React, {Component} from "react";
import { connect } from "react-redux";

//大神界面路由容器主
class Dashen extends Component{
	render(){
		return (
			<div>Dashen</div>
			)
	}
}

export default connect(
	state => ({}),
	{}
	)(Dashen)
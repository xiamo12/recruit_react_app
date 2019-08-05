import React, {Component} from "react";
import { connect } from "react-redux";
import UserList from "../../components/user-list/user-list";
import { getUserList } from "../../redux/actions";

//大神主界面路由容器
class Dashen extends Component{
	componentDidMount(){
		//初始化的时候显示，获取userList
		this.props.getUserList("laoban")
	}
	render(){
		return (
			<UserList userList={this.props.userList}></UserList>
			)
	}
}

export default connect(
	state => ({userList:state.userList}),
	{getUserList}
	)(Dashen)
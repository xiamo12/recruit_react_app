import React, {Component} from "react";
import { connect } from "react-redux";
import UserList from "../../components/user-list/user-list";
import { getUserList } from "../../redux/actions";

//老板主界面路由容器
class Laoban extends Component{
	componentDidMount(){
		//初始化的时候显示，获取userList
		this.props.getUserList("dashen")
	}
	render(){
		return (
			<UserList userList={this.props.userList} />
			)
	}
}

export default connect(
	state => ({userList:state.userList}),
	{getUserList}
	)(Laoban)
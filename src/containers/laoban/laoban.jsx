import React, {Component} from "react";
import { connect } from "react-redux";
import UserList from "../../components/user-list/user-list";
import { getUserList } from "../../redux/actions";

//老板主界面路由容器
class Laoban extends Component{
	componentDidMount(){
		//初始化的时候显示，获取userList
		this.props.getUserList("dashen") 
		//⬆️getUserList是一个获取用户列表的异步action。
		//从redux/actions.js文件中获取。
		//当type为dashen时，返回数据对象{config,data,headers...}等，其中data:{_id:"",username:"",type:"",header:"",info:"",post:""}
	}
	render(){
		return (
			<UserList userList={this.props.userList} />
			)
	}
}

export default connect(
	state => ({userList:state.userList}), 
//⬆️从reducers里获取到userList，请求参数是从异步action：getUserList里通过reqUserList(type)接口请求得到，并依此分发同步actionreceiveUserList
	{getUserList}
	)(Laoban)


	//1）通过异步action：getUserList()分发的同步action：receiveUserList更改数据状态；
	//2）通过子组件UserList渲染呈现出来的用户列表。"大神"界面渲染"老板"列表；反之亦是。
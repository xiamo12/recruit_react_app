//选择用户头像的UI组件
import React,{ Component } from "react";
import { List, Grid } from "antd-mobile";
import PropTypes from "prop-types";


class HeaderSelector extends Component{
	constructor(props){
		super(props);
		//准备需要显示的头像列表数据
		this.headerList = [];
		for (let i = 0; i < 20; i++) {
			this.headerList.push({
				text: "头像" + (i+1),
				icon: require(`../../assets/images/头像${i+1}.png`) //不能使用import；此处地址使用模版字符串，用require动态加载头像对应的地址
			})
		}
	}

	static propTypes = {
		setHeader: PropTypes.func.isRequired
	}

	state = {
		icon: null //放置图片对象，默认没有值
	}

	handleClick = ({text,icon})=>{
		//更新当前组件状态
		//调用函数更新父组件状态
		this.setState({icon}); //为什么写成表达式的形式？
		this.props.setHeader(text)
	}

	render(){
		//头部界面
		const { icon } = this.state;
		const listHeader = !icon ? "请选择头像" : (<div>已选择头像： <img src={icon} alt="头像"/></div>);
		return <List renderHeader={()=> listHeader}><Grid data={this.headerList} columnNum={5} onClick={this.handleClick}></Grid></List>
	}
}

export default HeaderSelector;
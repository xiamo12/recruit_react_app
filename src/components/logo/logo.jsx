//用于显示图片，不需要与数据进行交互。将显示图片的操作写成一个函数组件

import React from "react";
import logo from "./logo.png";
import "./logo.less";

export default function Logo(){
	return (
		<div className="logo-container">
		<img src={logo} alt="logo" className="logo-img"/>
		</div>
		)
}
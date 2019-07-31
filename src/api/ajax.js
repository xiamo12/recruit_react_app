// 使用axios封装ajax请求函数，函数返回一个Promise对象

import axios from "axios";
export default function ajax(url,data={},type="GET"){ //给data和type设置默认值
	if (type === "GET") {
		//将获取到的data数据进行处理，拼接请求参数的字符串。
		//请求参数的格式是url?xxx=xxx&yy=yy
	let paramStr = ""
	Object.keys(data).forEach(key => {
		paramStr += key + "=" + data[key] + "&";
	});
	if (paramStr) {
		paramStr.subString(0, paramStr.length-1); //去掉最后一个“&”号
	}
	//使用axios发送get请求
		return axios.get(url+"?"+paramStr);
	}else{
		//用axios发送post请求。
		return axios.post(url,data)
	}
}


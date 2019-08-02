//包含多个工具函数的模块



// redirectTo: 对应四个可能的用户跳转界面：
//用户主界面路由
// dashen： /dashen
// laoban： /laoban
//用户信息完善界面路由
// dashen： /dasheninfo
// laoban： /laobaninfo
//通过user.header是否有值判断是否已经完善信息；通过user.type判断用户类型，从而决定界面要跳转到哪种信息完善界面去。
//以下函数返回对应的路由路径：
export function getRedirectTo(type, header){ //用export暴露，因为此文件里可能有多个工具函数。
	let path = "";
	if(type === "laoban") {
		path = "/laoban"
	}else{
		path = "/dashen"
	}
	if (!header) { //没有值，返回信息完善的界面的path
		path += 'info';
	}
	return path;
}

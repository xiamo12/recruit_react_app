//此模块没有向外暴露什么，执行它就行了，要想让它执行，可以引入到入口js文件上
import io from "socket.io-client";




	//发送消息
	socket.emit('sendMsg',{name: "abc"})  //第二个参数只要是js支持的数据类型都可以
	//客户端发送消息，消息名为sendMsg，发送的内容是一个对象。此时需要服务器端来接受，需要设计服务器端的代码-->
	//写完服务器的代码后，回过来写客户端的代码
	console.log('客户端向服务器发消息', {name: "abc"});

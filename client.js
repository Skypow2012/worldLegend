var dgram = require('dgram');
var udp_client = dgram.createSocket('udp4'); 

udp_client.on('close',function(){
    console.log('udp client closed.')
})

//错误处理
udp_client.on('error', function () {
    console.log('some error on udp client.')
})

// 接收消息
udp_client.on('message', function (msg,rinfo) {
    console.log(`receive message from ${rinfo.address}:${rinfo.port}：${msg}`);
})

//定时向服务器发送消息
setInterval(function(){
    var SendBuff = 'hello 123.';
    var SendLen = SendBuff.length;
    udp_client.send(SendBuff, 0, SendLen, 25678, 'imcks.cn'); 
},3000);
var dgram = require('dgram');
//创建 udp server
var udp_server = dgram.createSocket('udp4');
udp_server.bind(5678); // 绑定端口

// 监听端口
udp_server.on('listening', function () {
    console.log('udp server linstening 5678.');
})

let arrs = [];

//接收消息
udp_server.on('message', function (msg, rinfo) {
    console.log(msg);
    strmsg = msg.toString();
    arrs.push(rinfo);
    for (let i = 0; i < arrs.length; i++) {
      const _rinfo = arrs[i];
      const _rinfo2 = arrs[i+1] || arrs[i-1];
      if (!_rinfo2) continue;
      let msg = `${_rinfo2.address}|${_rinfo2.port}`;
      console.log(msg, _rinfo.port, _rinfo.address);
      udp_server.send(msg, 0, msg.length, _rinfo.port, _rinfo.address); //将接收到的消息返回给客户端
    }
    // udp_server.send(strmsg, 0, strmsg.length, rinfo.port, rinfo.address); //将接收到的消息返回给客户端
    console.log(`udp server received data: ${strmsg} from ${rinfo.address}:${rinfo.port}`)
})
//错误处理
udp_server.on('error', function (err) {
    console.log('some error on udp server.')
    udp_server.close();
})

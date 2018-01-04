/* 实例化外部依赖 */
let Koa = require("koa2");
let WebSocket = require("koa-websocket");

/* 实例化 WebSocket, 实例化储存所有上线文数组 并分配监听的端口 */
let app = WebSocket(new Koa());
let ctxs = [];
app.listen(8200);

/* 实现简单的接发消息 */
app.ws.use((ctx, next) => {
    ctxs.push(ctx);
    console.log(ctx.websocket._ultron.id);
    /*将连接信息存入到数据库中，包括用户名，连接id，时间，消息类型,消息内容*/

    var message = null;
    /*转发所有消息，客户端根据消息类型进行选择性渲染*/
    ctx.websocket.on("message", (opt) => {
        for(let i = 0; i < ctxs.length; i++) {
            message = JSON.parse(opt);
            ctxs[i].websocket.send(opt);
        }
    });
});
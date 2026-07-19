const { createServer } = require('http');
const { WebSocketServer } = require('ws');

const server = createServer();
const wss = new WebSocketServer({ server });
const port = 3002;

// サーバを起動
server.listen(port, () => {
  console.log(`WebScoket server is listening on port: ${port}`);
});

// 接続を待ち受ける。
wss.on('connection', (ws) => {
  ws.send(`こんにちは、${ws.id} さん`);

  // クライアントからのメッセージを受け取る。
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    // クライアントに返信する。
    ws.send(`サーバからの返信: ${message}`);
  });

  // クライアントが切断したときの処理
  ws.on('close', () => {
    console.log(`Client ${ws.id} disconnected`);
  });
});
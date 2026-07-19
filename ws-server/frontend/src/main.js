// ws プロトコルなので、file:// でも動作する。
const ws = new WebSocket('ws://localhost:3002');

ws.onopen = () => {
  console.log('WebSocket connection established');
  ws.send('Hello, server!');
};

ws.onmessage = (event) => {
  console.log(`Received message from server: ${event.data}`);
};

ws.onclose = () => {
  console.log('WebSocket connection closed');
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};
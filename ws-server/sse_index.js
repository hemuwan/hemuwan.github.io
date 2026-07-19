// server.js
const http = require('http');

const server = http.createServer((req, res) => {
  // ===== ① トップページ（HTML返す）=====
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>SSE Demo</title>
      </head>
      <body>
        <h1>SSE Test</h1>
        <div id="log"></div>

        <script>
          const log = document.getElementById('log');

          const es = new EventSource('/events');

          es.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const p = document.createElement('p');
            p.textContent = 'count: ' + data.count;
            log.appendChild(p);
          };
        </script>
      </body>
      </html>
    `);
    return;
  }

  // ===== ② SSEエンドポイント =====
  if (req.url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    let count = 0;

    const interval = setInterval(() => {
      const data = JSON.stringify({ count });

      res.write(`data: ${data}\n\n`);
      count++;
    }, 1000);

    // クライアント切断時
    req.on('close', () => {
      clearInterval(interval);
      console.log('client disconnected');
    });

    return;
  }

  // ===== ③ それ以外 =====
  res.writeHead(404);
  res.end('Not Found');
});

server.listen(3000, () => {
  console.log('http://localhost:3000');
});
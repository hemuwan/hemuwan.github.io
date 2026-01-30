const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

// passport local の設定を読み込み
require('../config/passportLocal')(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静的ファイルの提供
app.use(express.static('public'));

// ルーティング設定
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

// error テスト
app.get('/error', (req, res) => {
  throw new Error('Test error');
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(
    path.join(__dirname, './views/404.html')
  );
});

// 500
app.use((err, req, res) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const path = require('path');
const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middleware/isAuthenticated');

// GET /
router.get('/', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/error2', (req, res, next) => {
  const err = new Error('DB接続失敗とか');
  next(err);
});

module.exports = router;
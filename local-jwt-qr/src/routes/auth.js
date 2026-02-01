const path = require('path');
const passport = require('passport');
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// singin 画面
router.get('/signin', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/'); // ログイン済みならホームへ
  }
  res.sendFile(path.join(__dirname, '../views/singin.html'));
});

// signin
router.post('/signin', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/signin'
}));

// singin 後、jwt 発行
router.get('/jwt', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // JWT 発行
  const payload = {
    id: req.user.id
    , username: req.user.username
    , emailaddress: req.user.emailaddress
    , role: 'user'
  }
  const JWT_SECRET_KEY = 'jwt-secret-key';
  const options = { 
    expiresIn: '12h' // トークンの有効期限
    , issuer: 'http://local-jwt-qr-web' // トークンを発行したシステム
    , audience: ['local-jwt-qr-api'] // トークンの想定利用者
    , subject: String(req.user.id)
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, options);
  res.status(200).json({ token });

  /**
   * 検証
   * const decoded = jwt.verify(token, JWT_SECRET_KEY, {
   *   issuer: 'http://local-jwt-qr-web',
   *   audience: 'local-jwt-qr-api'
   * });
   * console.log(decoded);
   * どれかが違うとエラーを履くのでtry catch で囲むこと
   */
});

// signout
router.get('/signout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/auth/singin');
  });
});

module.exports = router;
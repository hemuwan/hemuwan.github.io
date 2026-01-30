const path = require('path');
const passport = require('passport');
const express = require('express');

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

// signout
router.get('/signout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/auth/singin');
  });
});

module.exports = router;
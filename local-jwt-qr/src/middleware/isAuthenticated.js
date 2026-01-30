// local 認証用のミドルウェア
module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/signin');
}

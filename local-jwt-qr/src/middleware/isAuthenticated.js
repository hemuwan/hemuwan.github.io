// local 認証用のミドルウェア
const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/signin');
  }
  return next();
}

module.exports = isAuthenticated;
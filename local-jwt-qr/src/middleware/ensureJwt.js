const jwt = require('jsonwebtoken');

// jwt 格納済みか、期限内か
const ensureJwt = (req, res, next) => {
  if (!req.session || !req.session.jwt) {
    return res.status(401).json({message: 'Unauthorized: JWT token is missing'});
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET_KEY, {
      issuer: 'http://local-jwt-qr-web'
      , audience: ['local-jwt-qr-api']
    });
    
    return next();
  } catch (err) {
    // 期限切れもエラー
    return res.redirect('/auth/signin');
  }
}

module.exports = ensureJwt;
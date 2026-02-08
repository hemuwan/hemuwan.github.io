const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

// dummy
const users = Array(300).fill(null).map((_, i) => {
  const id = i + 1;
  const username = `user${id}`;
  return {
    id,
    username,
    emailaddress: `${username}@example.com`,
    password: username
  }
});

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // header に Authorization: Bearer <token> で渡されることを想定
  , secretOrKey: process.env.JWT_SECRET_KEY
  , issuer: 'http://local-jwt-qr-web'
  , audience: ['local-jwt-qr-api']
};

passport.use(new JwtStrategy(options, async (payload, done) => {
  try {
    // payload を元にユーザーを特定するロジックを実装
    // ここではダミーとして payload.id を使ってユーザーを検索する例を示す
    const user = users.find(x => x.id === payload.id);
    if (!user) {
      return done(null, false);
    } 

    return done(null, {
      id: user.id
      , username: user.username
      , emailaddress: user.emailaddress
    });
  } catch (err) {
    return done(err, false);
  }
}));

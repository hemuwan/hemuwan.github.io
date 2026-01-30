const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const session = require('express-session');

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

const findUserByUserEmailaddress = async (emailaddress) => {
  return users.find(x => x.emailaddress === emailaddress);
}

const matchPassword = async (user, password) => user.password === password;

// 認証ロジック
passport.use(new LocalStrategy({ usernameField: 'emailaddress'}, async (email, password, done) => {
  try {
    const user = await findUserByUserEmailaddress(email);
    if (!user) {
      return done(null, false, { message: 'ユーザーが存在しません'});
    }

    const match = await matchPassword(user, password);

    if (!match) {
      return done(null, false, { message: 'メールアドレスかパスワードが間違っています。'});
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// 認証に成功したらユーザー情報をセッションに保存
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// リクエストに対してセッションが存在したらユーザ情報を復元
// 例えば、req.user = { id: 1, username: 'user1', emailaddress: 'user1@example.com' }
// のようになる
passport.deserializeUser((id, done) => {
  try {
    const user = users.find(x => x.id === id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = (app) => {
  // session
  app.use(session({
    secret: 'express-session-secret'
    , resave: false // セッションを常に保存し直すかどうか
    , saveUninitialized: false // 未初期化のセッションを保存するかどうか
    , cookie: {
      maxAge: 12 * 60 * 60 * 1000 // 12h
      , secure: false // HTTPS を使う場合は true にする
      , httpOnly: true // クライアント側の JavaScript から参照できないようにする
    }
  }));
  
  // session を使う場合は、必ず session の後に初期化すること
  // pasport 初期化
  app.use(passport.initialize());
  app.use(passport.session());
}
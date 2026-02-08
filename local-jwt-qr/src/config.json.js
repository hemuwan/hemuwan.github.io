const config = () => {
  const data = {
    SESSION_SECRET: "express-session-secret"
    , JWT_SECRET: "jwt-secret-key"
    // ネストはできない。[Object: Object] になる 
    // , nest: {
    //   db: {
    //     host: 'localhost',
    //     port: 5432,
    //     username: 'postgres',
    //     password: 'password',
    //     database: 'local_jwt_qr_db'
    //   }
    // }
  }

  Object.entries(data).forEach(([key, value]) => {
    if (!process.env[key]) {
      process.env[key] = value;
    }
  });
}

module.exports = config;
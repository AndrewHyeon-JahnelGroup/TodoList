const session = require('express-session');
// const config = require('config')['redis'];
// const RedisStore = require('connect-redis')(session);
// const Redis = require('ioredis');
var Promise = require('bluebird');
const uid = require('uid-safe')
// if (process.env.NODE_ENV === 'production') {
//   const redisClient = require('redis').createClient(config.REDIS_URL);
//   var newRedis = new Redis(config.REDIS_URL);
//   var redisStoreClient = {
//     url: config.REDIS_URL
//   };
// } else {
//   const redisClient = require('redis').createClient();
//   var newRedis = new RedisStore(redisStoreClient);
//   var redisStoreClient = {
//     client: redisClient,
//     host: 'localhost',
//     port: 6379
//   };
// }

module.exports.verify = (req, res, next) => {

  Promise.resolve(req.isAuthenticated())
    .then( () => {
      if (req.isAuthenticated()) {
        // console.log(req.body);
        next();
      } else {
        res.redirect('/login');
      }
      // console.log(res.body)
    });
};


module.exports.session =  session({
  secret: uid.sync(18),
  cookie: {
    maxAge: 86400 * 1000 // 24 hours in milliseconds
  },
  resave: false,
  saveUninitialized: true
});

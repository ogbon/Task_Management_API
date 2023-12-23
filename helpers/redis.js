const redis = require('redis')

require('dotenv').config()

const redisClient = () => redis.createClient(process.env.REDIS_URL)

const setToRedis = (key, value, expiry = 86400) => redisClient().set(key, value, 'EX', expiry)

const getFromRedis = key => new Promise((resolve, reject) => {
  if (key) {
    redisClient().get(key, (err, reply) => {
      if (err)
        reject(err)
      else
        resolve(reply)
    })
  } else {
    reject('Key is missing')
  }
})

module.exports = {
   redisClient,
   setToRedis,
   getFromRedis
}

var redis = require('../../../utils/redis_store');
module.exports = {

  users: {
    getUser: {store: redis, db: 0, ttl: 86400 * 30}
  }
}

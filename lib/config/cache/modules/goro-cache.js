var redis = require('../../../utils/redis_store');
module.exports = {
    goro: {
        //components: {store: redis, db: 0, ttl: 86400}
        nibbler: {store: 'memory', db: 0, ttl: 86400},
        widgetDestinations: {store: 'memory', db: 0, ttl: 86400}
    }
}

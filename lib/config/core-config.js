var _ = require('underscore');
// Load app configuration
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = _.extend(
    require('./env/all.js'),
    require('./env/' + env + '.js') || {});


    
    
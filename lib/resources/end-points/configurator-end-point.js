/**
 *
 * @type {{all: string, detail: string}}
 */

var config = require('../../config/core-config');

exports.configurator = {
	getConfiguration: { method:'get', path: config.configurator.basePath }
}



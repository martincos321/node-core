/**
 *
 * @type {{all: string, detail: string}}
 */

var config = require('../../config/core-config');

exports.backoffice = {
	newDestination : { method:'get', path: '/admin/destinos-crear.html' },
	publicGetGeoDestination : { method:'get', path: coreConfig.backoffice.publicPath + '/backoffice/destinations/:id' },
	publicCreateDestination: { method:'post', path: coreConfig.backoffice.publicPath + '/backoffice/destinations/create' }

}

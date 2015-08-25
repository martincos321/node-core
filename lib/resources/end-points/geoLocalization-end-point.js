/**
 *
 * @type {{all: string, detail: string}}
 */
var coreConfig = require('../../config/core-config');

exports.geoLocalization = {
  geoLocalizationByIP: { method:'get', path: coreConfig.geo.basePath + '/geolocalization/:ipAddress' }
}


/**
 *
 * @type {{all: string, detail: string}}
 */
var coreConfig = require('../../config/core-config');

exports.photos = {
  apiGetPhotosByDestination           : { method:'get', path: coreConfig.api.basePath + '/city/:idCity/pictures?limit=:limit'}
}


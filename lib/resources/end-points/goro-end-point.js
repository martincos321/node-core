/**
 *
 * @type {{all: string, detail: string}}
 */

var config = require('../../config/core-config');

exports.goro = {
    components: { method:'get', path: config.goro.basePath + "/components/:lang/:country/header_footer" },
    widgetDestinations: { method:'get', path: config.goro.basePath + "/components/:lang/:country/widgetDestinations" },
    nibbler   : { method:'get', path: config.goro.basePath + "/components/:lang/:country/nibbler" },
    template  : { method:'get', path: config.goro.privatePath + "/html/:module?locale=:lang&country=:country" }
}


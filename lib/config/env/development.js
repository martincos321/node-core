var GORO_PORT = false;
var USERS_PORT = false;

var goroPath = (GORO_PORT)? "http://dev.servers.despegar.it:3001" : "http://vjf-goro-00.servers.despegar.it:9290";
var usersPath = (USERS_PORT)? "http://dev.servers.despegar.it:3002" : "http://vjf-users-00.servers.despegar.it:9290";

var configDev = {
    api: {
        basePath: "http://vj-api-01.servers.despegar.it:9290/v3"
    },
    goro: {
        basePath: goroPath,
        privatePath: "http://dev.servers.despegar.it:3001"
    },
    statics: {
        basePath: "",
        jsBasePath: "//vj-js.staticontent.com/public",
        cssBasePath: "//vj-css.staticontent.com/public",
        imgBasePath: "//vj-img.staticontent.com/public",
        cdnAssetsPath: "//dzuy3enlsy5a2.cloudfront.net",
        cdnImagesPath: "//du4zwgdg3nwxa.cloudfront.net"
    },
    hotels: {
        basePath: "http://localhost:3000"
    },
    metasearcher: {
        basePath: "http://dev.servers.despegar.it:3000"
    },
    viajeros: {
        basePath: "http://es.rc.viajeros.com"
    },
    viajeros2: {
        basePath: "http://es.centosvm.viajeros.com"
    },
    geo: {
        basePath: "http://geo.despegar.com/geo-services-web/service/webcontext"
    },
    configurator: {
        basePath: "http://interdac:4pp53rv3rmmx1@50.17.26.213/app.php/configuracion/get_full/ic"
    },
    users: {
        basePath: usersPath
    },
    tracking: {
        id: "UA-6774114-2"
    },
    backoffice: {
        basePath: "",
        publicPath: ""
    }
};

module.exports = configDev;

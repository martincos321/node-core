/**
 * Middleware locale
 * ------------------------
 * ------------------------
 *
 * Created to send on request locale information like language and country of the user
 *
 */
var url = require('url');
var localeResolver = require("../services/locale/locale-resolver");

var domainMiddleware = function (req, res, next) {

    if(req && req.headers && req.headers['x-forwarded-for']){
        //logger.info("Domain-middleware", "x-forwarded-for "+ req.headers['x-forwarded-for']);
    }

    var xforwaredfor = (req.headers['x-forwarded-for'])? req.headers['x-forwarded-for'].split(', ') : [];
    if(xforwaredfor.indexOf("54.197.240.110") > -1)
        xforwaredfor.splice(xforwaredfor.indexOf("54.197.240.110"), 1);
    if(xforwaredfor.indexOf("54.163.248.19") > -1)
        xforwaredfor.splice(xforwaredfor.indexOf("54.163.248.19"), 1);

    var ip = (xforwaredfor.length > 0)? xforwaredfor[xforwaredfor.length -1] : req.connection.remoteAddress;

    if ( ip == '127.0.0.1' ) ip = '190.9.14.66'; // default MDQ

	var hostname = req.headers.host;
    var pathname = url.parse(req.url).pathname;
	req.fullUrl = req.protocol + '://' + hostname + pathname;

    localeResolver(res, ip).then(function(response){
        if(response.redirectTo){
            res.redirect(301, req.protocol+"://"+response.redirectTo+req.url);
        }else{
            req.domainResolved = response;
            req.domainResolved.clientIp = ip;
            req.locale = req.domainResolved.locale;

            next();
        }
    });
};

module.exports = domainMiddleware;
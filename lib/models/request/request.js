var _ = require("underscore");
var os = require('os');

var Request = function (data, req) {
	var uowHeader 		= (req && req.headers)? req.headers["X-UOW"] || req.headers["x-uow"] || false : false; 
	var serverName 		= os.hostname();
	var isNewRequest    = (uowHeader)? false : true;
	var isAjax          = (req && req.headers && req.headers["ajax"])? true : false; 
    var customHeaders   = data.headers || {};
    var reqHeaders      = (req)? req.passFowardHeaders : {};
    var uowObj          = (uowHeader)? { "X-UOW" : uowHeader } : { "X-UOW" : data.type+"-"+data.method+"-"+serverName+"-"+Math.round((new Date).getTime() * Math.random(100)) };
    var clientIp 		= (req && req.headers && req.headers["x-forwarded-for"])? req.headers['x-forwarded-for'] : (req && (req.connection || req.socket))? req.connection.remoteAddress || req.socket.remoteAddress : "unknow";

	this.type 			= data.type || undefined;
	this.method 		= data.method || undefined;
	this.search 		= data.search || {};
	this.model 			= data.model || undefined;
	this.apiResponse	= data.apiResponse || require('../api-response/api-response')
	this.endpoint 		= data.endpoint || undefined;
	this.headers 		= _.extend(reqHeaders, customHeaders, uowObj);
	this.collections 	= data.collections || [];
	this.primaryKey		= data.primaryKey || "id";
	this.foreignKey     = data.foreignKey || this.primaryKey;
	this.insertKey      = data.insertKey || data.type;
    this.userAgent      = (req && req.headers && req.headers["user-agent"])? req.headers["user-agent"] : "";
	this.body           = (data.data)? JSON.stringify(data.data) : undefined;
    this.form           = data.form || undefined;
    this.timeout        = data.timeout || 10000;

    this.reqInfo        = {
    	uow 			: uowObj["X-UOW"],
    	remoteIP 		: clientIp,
    	userAgent 	    : this.userAgent,
    	action          : this.type+"."+this.method+"."+data.endpoint.method.toUpperCase(),
    	cookies         : (req && req.cookies)? req.cookies : undefined,
    	hostname		: serverName,
    	search          : this.search,
    	isNewRequest    : isNewRequest,
    	isAjax          : isAjax
    };

    return this;
};

module.exports = Request;
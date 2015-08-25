var Q = require('q');
var request = require('request');
var responseError = require("../exceptions/defaultError");


function requestResponse(method, params, options){
  var ApiResponse = params.apiResponse || require('../models/api-response/default-response');
  var deferred = Q.defer();
  var urlTrans = exports.getPath(params.endpoint.path, params.search);
  var timestampStart = new Date();

    if(options.headers.Cookie)
        request.cookie(options.headers.Cookie);
    if(params.body)
	    options.body = params.body;
    if(params.form)
        options.form = params.form;
    options.timeout = params.timeout;

  logger.info("Request ["+method.toUpperCase()+"]: " + urlTrans, params);
  request[method](urlTrans, options, function (error, response, body) {
    var timestampEnd = new Date();
    var response = response || undefined;
    var apiResponse = new ApiResponse(error, response, body);
    var diff = (timestampEnd - timestampStart) / 1000;
    var statusCode = (response && response.statusCode)? response.statusCode : 500;

    if (apiResponse.error) {
      var error = new responseError(apiResponse.error.statusCode, { code: apiResponse.error.code, description : apiResponse.error.description }, apiResponse);
      logger.error("Response error ["+method.toUpperCase()+"] ["+statusCode+"] ["+error.description+"]: "+urlTrans+ " in: " + diff + " sec", error.extraInfo);
      deferred.reject(error);
    }else{
      deferred.resolve(apiResponse);
      logger.info("Response success ["+method.toUpperCase()+"] ["+statusCode+"]: "+urlTrans+ " in: " + diff + " sec", apiResponse);
    }
  });

  return deferred.promise;
}

exports.get = function (params, options) {
  return requestResponse('get', params, options);
};

exports.post = function (params, options) {
  return requestResponse('post', params, options);
};

exports.put = function (params, options) {
  return requestResponse('put', params, options);
};

exports.delete = function (params, options) {
  return requestResponse('del', params, options);
};

exports.head = function (params, options) {
  return requestResponse('head', params, options);
};

exports.json = function (params, options) {
  return requestResponse('json', params, options);
};

exports.postJson = function (params, options) {
  return requestResponse('postJson', params, options);
};


exports.getPath = function (url, params) {
  if (!url) {
    logger.error("request:getPath", 'url is null');
    return false;
  }

  for (var key in params) {
    if (!params[key] || params[key] == "") {
      var regex = new RegExp("([?|&])" + key + "=:" + key);
      url = url.replace(regex, "");
    } else {
      url = url.replace(":" + key, params[key]);
    }
  }
  return url;
}

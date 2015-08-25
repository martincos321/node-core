var responseError = require("../../exceptions/responseError");

var configuratorResponse = function(error, response, body){

    error =  (error)? error : (body.errors)? body.errors : undefined;

    this.data = {
    	headers  : (response)? response.headers : undefined,
        data     : (body)? [body] : undefined,
        error    : (error) ? new responseError(error) : undefined
    };

    return this.data;
};

module.exports = configuratorResponse;
var responseError = require("../../exceptions/responseError");

var hotelResponse = function(error, response, body){

    error =  (error)? error : (body.errors)? body.errors : undefined;

    this.data = {
        headers  : (response)? response.headers : undefined,
        data     : (body)? body[0]["data"]["HotelsResult"] : undefined,
        meta     : {
            providers   : (body)?body[0]["data"]["providers"] : undefined,
            currencyCode: (body)?body[0]["data"]["currencyCode"] : undefined,
            lowestRate  : (body)?body[0]["data"]["lowestRate"] : undefined,
            highestRate : (body)?body[0]["data"]["highestRate"] : undefined
        },
        error    : (error)? new responseError(error): undefined
    };

    return this.data;
};

module.exports = hotelResponse;
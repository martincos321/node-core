var responseError = require("../../exceptions/responseError");

var DefaultResponse = function (error, response, body) {
    var data;
    error = (error) ? error : (body.errors) ? body.errors : undefined;

    if (body) {
        data = body.items ? body.items : [body];
    } else {
        data = undefined;
    }

    this.data = {
        headers : (response)? response.headers : undefined,
        meta    : (body) ? body.paging : undefined,
        data    : data,
        error   : (error) ? new responseError(error) : undefined
    };

    return this.data;
};

module.exports = DefaultResponse;
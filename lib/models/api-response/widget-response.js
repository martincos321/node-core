var responseError = require("../../exceptions/responseError");

var WidgetResponse = function (error, response, body) {
    // widgetResponse
    var data;
    error = (error) ? error : (body.errors) ? body.errors : undefined;

    if (body) {
        data = body;
    } else {
        data = undefined;
    }

    this.data = {
        headers : (response)? response.headers : undefined,
        meta    : undefined,
        data    : [data],
        error   : (error) ? new responseError(error) : undefined
    };

    return this.data;
};

module.exports = WidgetResponse;

var ApiResponse = function (error, response, body) {
    var _err = "";
    if(error)
        _err = error;
    if ( response && response.statusCode != 200) {
      _err = {
        code: (body && body.code)?body.code : 100,
        description: (body && body.message)?body.message : body,
        statusCode: response.statusCode
      };
    }
    if(body && body.errors)
        _err = {
            code: 100,
            description: body.errors,
            statusCode: 500
        }
    if(typeof body == "string")
        _err = {
            code: 100,
            description: body,
            statusCode: 500
        }

  this.data = {
    headers     : (response)? response.headers : undefined,
    meta        : (body) ? body.paging : undefined,
    data        : (body && body.items) ? body.items : [body],
    error       : (_err != "")?_err : undefined,
    timestamp   : new Date().getTime()
  };

  return this.data;
};

module.exports = ApiResponse;

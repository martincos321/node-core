
var PhpApiResponse = function (error, response, body) {
	var _err = "";
	if(error)
		_err = error;
	if ( response && response.statusCode != 200) {
		_err = {
			code: response.statusCode,
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

	this.data = {
		headers   : (response)? response.headers : undefined,
		meta 	  : undefined,
		data 	  : (body && body.items) ? body.items : [body],
		error 	  : (_err != "")?_err : undefined,
		timestamp : new Date().getTime()
	};

	return this.data;
};

module.exports = PhpApiResponse;

var responseError = require("../../exceptions/responseError");

var GeoLocalizationResponse = function (error, response, body) {
  var data;

  if ( error ) {
    return {
      error: new responseError(error)
    }
  }

  if ( response.statusCode == 500 || response.statusCode == 404 ) {
    error = {
      code: '',
      description: body
    };
  }

  error = (error) ? error : (body.errors) ? body.errors : undefined;

  var closestCity = body.data.closestCities.length ? body.data.closestCities[0] : undefined;

  this.data = {
    headers : (response)? response.headers : undefined,
    meta    : [body.meta] || undefined,
    data    : [closestCity.data] || undefined,
    error   : (error) ? new responseError(error) : undefined
  };

  return this.data;
};

module.exports = GeoLocalizationResponse;

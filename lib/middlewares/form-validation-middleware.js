/**
 * Form validation
 * ------------------------
 * ------------------------
 *
 * Use this middleware to validate any form. You must send the
 *
 */

var validationService = require("../services/validation/index");

var formValidate = function (req, res, next) {
    var vs = validationService();
    var registerParams = req.body.form;
    if(!registerParams)
        handdleError("Invalid format");

    var formParams = {};

    var paramsValidated = vs.init(registerParams);
    var hasErrors = false;

    for(var i=0; i < paramsValidated.length; i++){
        formParams[paramsValidated[i].id] = paramsValidated[i].value;
        if(paramsValidated[i].errors.length > 0){
            hasErrors = true;
            break;
        }
    }

    req.body = formParams;

    if(!hasErrors)
        next();
    else
        handdleError("Validation failed", paramsValidated);

    function handdleError(err, data){
        res.send(422, data);
    }
};

module.exports = formValidate;
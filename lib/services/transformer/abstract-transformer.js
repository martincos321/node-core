
var Q = require("q");
var _ = require('underscore')

var abstractTransformer = function(transformerOptions){
    var _transformerOptions = _.extend({}, transformerOptions);
    var deferred = Q.defer();
    var model = _transformerOptions.model || require('../../models/'+_transformerOptions.type);
    var connector = require('../connector/abstract-connector');
    var modelsArray = [];

    connector().get(_transformerOptions).then(transformerSuccess, transformerError);

    return deferred.promise;


    //Functions
    function transformerSuccess(response){
        try{
            for(var i=0; i < response.data.length; i++){
                var obj = new model(response.data[i]);
                modelsArray.push(obj);
            }
            response.data = modelsArray;
            deferred.resolve(response);
        }catch(e){
            transformerError(e);
        }
    }

    function transformerError(error){
        deferred.reject(error);
    }
};

module.exports = abstractTransformer;


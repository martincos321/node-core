var transformer = require('../transformer/abstract-transformer');
var Q = require('q');
var _ = require('underscore');

var abstractFacade = function () {
  var promises = [];
    var parentObject = {};
    var deferred = Q.defer();
    var _parentOptions;
  //Public Method
  function get(parentOptions) {
      _parentOptions = _.extend({},parentOptions);
    transformer(_parentOptions).then(transformerSuccess, transformerError);

    return deferred.promise;

  }

    //Private Method
    function transformerSuccess(modelArray) {
        parentObject = modelArray;

        //Llamadas en paralelo

        for (var i = 0; i < modelArray.data.length; i++) {
            var newParentObject = modelArray.data[i];

            if (_parentOptions.collections) {
                for (var j = 0; j < _parentOptions.collections.length; j++) {
                    var newParentOptions = _.extend(_parentOptions.collections[j]),
                    foreignKey = newParentOptions.foreignKey || _parentOptions.foreignKey,
                    primaryKey = newParentOptions.primaryKey || _parentOptions.primaryKey;
                    newParentOptions.search[foreignKey] = newParentObject[primaryKey];
                    promises.push(facadeMerge(newParentOptions, newParentObject));
                }
            }
        }

        Q.all(promises).then(function (data) {
            deferred.resolve(parentObject);
        }, transformerError);
    }

    function transformerError(error) {
        deferred.reject(error);
    }

    function facadeMerge(facadeMergeOptions, facadeMergeObject) {
        var deferred1 = Q.defer();
        var _facadeMergeOptions = _.extend({}, facadeMergeOptions);
        transformer(_facadeMergeOptions).then(function (collections) {

            facadeMergeObject[_facadeMergeOptions.insertKey] = collections.data;
            deferred1.resolve(facadeMergeObject);
        }, function(err){
            deferred1.reject(err);
        });
        return deferred1.promise;
    };

  return {
    get: get
  };

};
module.exports = abstractFacade;

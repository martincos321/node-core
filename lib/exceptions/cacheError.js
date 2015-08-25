
var CacheError = function(error){
    if(!error) return false;

    error = {
        code: error.status || undefined,
        description: error.description || undefined
    };

	return error;
};

module.exports = CacheError;
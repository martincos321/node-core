
var ApiError = function(error){
    if(!error) return false;

    this.error = {
        code: error.code || undefined,
        description: error.description || undefined
    };

    return this.error;
};

module.exports = ApiError;
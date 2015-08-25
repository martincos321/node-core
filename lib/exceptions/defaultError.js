
var DefaultError = function(status, error, extraInfo){
    if(!error) return false;

    this.error = {
    	status: status || "401",
        code: error.code || "NA",
        description: (error.description)? error.description : (error.code)? error.code : "Server Error",
        extraInfo: extraInfo || ""
    };

    return this.error;
};

module.exports = DefaultError;
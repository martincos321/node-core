var successResponse = function(data){
    this.statusCode = 200;
    this.data = data;

    return this;
};

module.exports = successResponse;
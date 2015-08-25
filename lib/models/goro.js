

var Goro = function(data){
    this.header = data.header;
    this.footer = data.footer;
    this.nibbler = data.nibbler;
    this.widgetDestinations = data.widgetDestinations;

    return this;
};

module.exports = Goro;
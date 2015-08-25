

var FlightSearch = function(data){
    this.oneway  		= (data.trip == 'oneway')? 'true' : 'false';
    this.going        	= data.going || undefined;
    this.back       	= data.back || undefined;
    this.dateGoing  	= data.checkin || undefined;
    this.dateBack       = data.checkout || undefined;
    this.passengers     = data.passengers || 1;
    this.providers      = data.providers || undefined;
    this.cid            = data.cid || 'VJAR12';
	// userID
    return this;
};

module.exports = FlightSearch;
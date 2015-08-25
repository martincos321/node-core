

var HotelSearch = function(data){
    this.destinationId  = data.destinationId || undefined;
    this.checkin        = data.checkin || undefined;
    this.checkout       = data.checkout || undefined;
    this.guests         = data.guests || undefined;
    this.providers      = data.providers || undefined;
    this.cid            = data.cid || 'VJAR12';
	// userID
    return this;
};

module.exports = HotelSearch;
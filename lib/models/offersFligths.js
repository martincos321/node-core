var OffersFlights = function (data) {
  this.idOrigin = data.origin_id || undefined;
  this.idDestination = data.destination_id || undefined;
  this.from = data.from || undefined;
  this.to = data.to || undefined;
  this.price = data.prices[0].price || 0;
  this.currency = data.prices[0].currency || "USD";

  if(data.prices && data.default_currency && data.prices.length > 0){
  	for(var i=0;i<data.prices.length;i++){
  		if(data.prices[i].currency == data.default_currency){
  			this.price = data.prices[i].price;
        this.currency = data.prices[i].currency;
  			break;
  		}
  	}
  }

  
  this.type = data.trip_type || "ONEWAY";
  this.image = (data.pictures && data.pictures.length > 0)? "/media/pictures/"+data.pictures[0]+"/463x363" : "";

  return this;
};

module.exports = OffersFlights;
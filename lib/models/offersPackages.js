var OffersPackages = function (data) {
  this.idOrigin = data.origin_id || undefined;
  this.idDestination = data.destination_id || undefined;
  this.nights = data.number_of_nights || 0;
  this.distribution = data.distribution || "0";
  this.currency = (data.prices && data.prices.length > 0)? data.prices[0].currency : "USD";
  this.price = (data.prices && data.prices.length > 0)? data.prices[0].price : 0;

  if(data.prices && data.default_currency && data.prices.length > 0){
  	for(var i=0;i<data.prices.length;i++){
  		if(data.prices[i].currency == data.default_currency){
  			this.price = data.prices[i].price;
        this.currency = data.prices[i].currency;
  			break;
  		}
  	}
  }

  this.names = data.names;
  this.image = (data.pictures && data.pictures.length > 0)? "/media/pictures/"+data.pictures[0]+"/463x363" : "";  

  return this;
};

module.exports = OffersPackages;
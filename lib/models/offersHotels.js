var OffersHotels = function (data) {
  this.id = (data.hotel)? data.hotel.id : undefined;
  this.idDestination = data.destination_id || undefined;
  this.name = (data.hotel)? data.hotel.name : undefined;
  this.image = "";

  if(data.hotel){
  	 this.image = (data.hotel.pictures.length > 0)? data.hotel.pictures[0] : "";
  }else{
  	 this.image = (data.pictures.length > 0)? data.pictures[0] : "";
  }

  this.rating = (data.hotel && data.hotel.rating)? (parseInt(data.hotel.rating) / 10) : 0;
  this.stars = (data.hotel && data.hotel.stars)? data.hotel.stars : 0;
  this.currency = (data.prices && data.prices.length > 0)? data.prices[0].currency : "USD";
  this.price = (data.prices && data.prices.length > 0)? Math.ceil(data.prices[0].price) : 0;

  if(data.prices && data.default_currency && data.prices.length > 0){
  	for(var i=0;i<data.prices.length;i++){
  		if(data.prices[i].currency == data.default_currency){
  			this.price = Math.ceil(data.prices[i].price);
        this.currency = data.prices[i].currency;
  			break;
  		}
  	}
  }

  this.isHotel = (data.hotel)? true : false;

  return this;
};

module.exports = OffersHotels;
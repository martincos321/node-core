var DestinationSearch = function (data) {

  this.continentId = data.continentId || undefined;
  this.countryId = data.countryId || undefined;
  this.cityId = data.cityId || undefined;
  this.limit = data.limit || 100;

  return this;
};

module.exports = DestinationSearch;
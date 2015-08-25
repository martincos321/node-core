var GeoLocalization = function (res) {
  this.id = res.countryOid || undefined;
  this.iataCode = res.iataCode || undefined;
  this.latitude = res.latitude || undefined;
  this.longitude = res.longitude || undefined;
  this.closestCityId = res.oid || undefined;

  return this;
};

module.exports = GeoLocalization;
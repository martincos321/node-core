var Continent = function (data) {
  this.id = data.id || undefined;
  this.iataCode = data.iataCode || undefined;
  this.shortDescriptions = data.shortDescriptions || undefined;
  this.descriptions = data.descriptions || undefined;
  this.names = data.names || undefined;
  this.slugs = data.slugs;
  this.countries = [];
  this.topCountries = [];

  return this;
};

module.exports = Continent;
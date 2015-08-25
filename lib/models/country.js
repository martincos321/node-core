var Country = function (data) {
  this.id = data.id || undefined;
  this.iataCode = data.iataCode || undefined;
  this.descriptions = data.descriptions || undefined;
  this.names = data.names || undefined;
  this.slugs = data.slugs;

  return this;
};

module.exports = Country;
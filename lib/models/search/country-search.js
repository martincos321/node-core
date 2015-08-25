var CountrySearch = function (data) {
  data = data || {};
  this.id = data.id || undefined;
  this.limit = data.limit || 100;

  return this;
};

module.exports = CountrySearch;
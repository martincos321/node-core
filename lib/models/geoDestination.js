var GeoDestination = function (data) {

  var model = {};

  model.id = data.id || undefined;
  model.iataCode = data.iataCode || undefined;
  model.descriptions = data.descriptions || undefined;
  model.names = data.names || undefined;
  model.slugs = data.slugs;
  model.parent_id = data.parent_id;
  model.destType = data.destType;

  return model;
};

module.exports = GeoDestination;
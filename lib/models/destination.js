var Destination = function (data) {

  var model = {};

  model.id = data.id || undefined;
  model.iataCode = data.iataCode || undefined;
  model.shortDescriptions = data.shortDescriptions || undefined;
  model.descriptions = data.descriptions || undefined;
  model.names = data.names || undefined;
  model.slugs = data.slugs;

	model.parent_id = data.parent_id || undefined;
	model.type = data.destination_type || undefined;
	model.exists_in_viajeros = data.exists_in_viajeros;

	model.coordinates = {
		longitude: data.longitude || undefined,
		latitude: data.latitude || undefined
	};

  return model;
};

module.exports = Destination;
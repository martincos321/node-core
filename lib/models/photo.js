var Photo = function (data) {

  var model = {};

  model.id = data.id || undefined;
  model.destinationId = data.destinationId || undefined;
  model.userId = data.userId || undefined;
  model.name = data.name || undefined;
  model.url = data.url;
  model.text = data.text || undefined;
  model.albumId = data.albumId || undefined;

  return model;
};

module.exports = Photo;
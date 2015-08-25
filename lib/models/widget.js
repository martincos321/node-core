var Widget = function (data) {

  var model = {};

  model.content = data || undefined;

  return model;
};

module.exports = Widget;
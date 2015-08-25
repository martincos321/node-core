var fs = require("fs");
var _ = require("underscore");

var endPoints = {};
fs.readdirSync(__dirname+"/end-points").forEach(function(file) {
    if(file.indexOf("js") > 0 && file != "model.js")
        _.extend(endPoints, require("./end-points/" + file));
});


module.exports=endPoints;
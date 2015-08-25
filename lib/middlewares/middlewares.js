var fs = require("fs");
var _ = require("underscore");

var middlewares = {};
fs.readdirSync(__dirname).forEach(function(file) {
    if(file.indexOf("js") > 0 && file != "middlewares.js")
        middlewares[file.replace(".js","")] =  require("./"+file);
});


module.exports=middlewares;
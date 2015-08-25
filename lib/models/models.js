var fs = require("fs");

var models = {};
var modules = ["api-response","request","search"];

for(var i= 0; i< modules.length; i++ ){
	fs.readdirSync(__dirname+"/"+modules[i]).forEach(function(file) {
	    if(file.indexOf("js") > 0 && file != "model.js")
	        models[file.replace(".js","")] = require("./"+modules[i]+"/" + file);
	});
}

fs.readdirSync(__dirname).forEach(function(file) {
    if(file.indexOf("js") > 0 && file != "model.js")
        models[file.replace(".js","")] = require("./" + file);
});

module.exports=models;
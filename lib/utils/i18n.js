/**
 * @author      Tincho y Henry.
 * @link        Ahi tenes
 * @license     No tenemos
 *
 * @version     0.0.1
 */

var vsprintf = require("sprintf").vsprintf,
    fs       = require("fs"),
    _        = require("underscore");


var catalog = {};
var supportedLanguages = ["es","pt"];

var i18n = function(req, res, next){
    var _locale  = "es_AR";
    var _lang    = "es";
    var _country = "AR";
    var _currentCatalog = {};

    if(req)
        init(req, res, next);


    function init(req, res, next){
        _locale  = req.locale || req.query.locale || undefined;
        _lang    = (req.domainResolved)? req.domainResolved.lang : (req.query.lang)? req.query.lang : (_locale && _locale.indexOf("_") != -1 && supportedLanguages.indexOf(_locale.split("_")[0].toLowerCase()) != -1)? _locale.split("_")[0].toLowerCase() : "es";
        _country = (req.domainResolved)? req.domainResolved.country : (req.query.country)? req.query.country : "AR";
        setCurrentCatalog();
        handleMethods(req, res);
    }

    function setCurrentCatalog(){
        _currentCatalog = (_locale && catalog[_locale])? catalog[_locale] : catalog[_lang];
    }

    function handleMethods(req, res){
        res.locals.t = translate;
        res.locals.teta = getCatalog ;
    }

    function configure(opt){
        fs.readdirSync(opt.directory).forEach(function(file) {
            if(file.indexOf("json") > 0){
                file = file.replace(".json","");
                var currentLocale = (file.indexOf("_") > -1)? file : file.split("_")[0];
                catalog[currentLocale] = _.extend({}, require(opt.directory +"/"+ file.split("_")[0]+".json"), require(opt.directory +"/"+file+".json"));
            }
        });
    }

    function getCatalog(){
        return JSON.stringify(_currentCatalog);
    }

    function getLocale(){
        return _locale;
    }

    function translate(){
        var key = arguments[0];
        var msg = _currentCatalog[key];
        return msg;
    }


    return {
        configure   : configure,
        getLocale   : getLocale,
        getCatalog  : getCatalog
    };
};


module.exports = i18n;

var _ = require("underscore");
var _ABConfig;

var abtManager = function(abId, res){
    var _self = this;
    var ABCookiePrefix = "X-ABT-";
    _self.abId = abId;
    _self.defaultValue = {value: "DEFAULT"};
    _self.isAvailable = false;
    _self.currentConfig = {};
    _ABConfig = res.req.configurator;

    //Constructor
    (function(){
        _ABConfig = JSON.parse(_ABConfig["ABT_MANAGER"]["ABConfig"]);
        _self.currentConfig = _ABConfig[_self.abId];
        if(_self.currentConfig){
            var today = new Date();
            var endDate = new Date(_self.currentConfig.endDate);
            var startDate = new Date(_self.currentConfig.startDate);
            if(today >= startDate && today <= endDate && checkAvailableSites(_self.currentConfig.sites))
                _self.isAvailable = true;
        }

    })()

    function getByCookie(){
        if(res.req.cookies[ABCookiePrefix + _self.abId])
            return res.req.cookies[ABCookiePrefix + _self.abId];
        return -1;
    }

    function checkAvailableSites(availableSites){
        var currentSite = res.req.domainResolved.country;
        availableSites = availableSites.split(",");
        if(_.indexOf(availableSites, currentSite) > -1 || _.indexOf(availableSites, "all") > -1 && !_.indexOf(availableSites, "~"+currentSite) > -1)
            return true;
        return false;
    }

    function setCookie(){
        var range = getRandomInt();
        var endDate = new Date(_self.currentConfig.endDate);
        //endDate = endDate.getTime()/1000;
        res.cookie(ABCookiePrefix + _self.abId, range.toString(), {expires:endDate, httpOnly: false});
        return range;
    }

    function getRandomInt(){
        return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    }

    //Public method
    function getABTest(){
        if(!_self.isAvailable)
            return _self.defaultValue;

        var abRange = (getByCookie() > -1)? getByCookie() : setCookie();

        for(var i=0; i < _self.currentConfig.ranges.length; i++){
            var range = _self.currentConfig.ranges[i];
            if(abRange >= range.startRange && abRange <= range.endRange)
                return range;
        }
        return _self.defaultValue;
    }

    return {
        getABTest: getABTest
    }

};


module.exports = abtManager;
/**
 *
 * @returns {{init: Function}}
 */

var validation = function(){
    var itemsValidated = [];

    var pattern = {
        NOT_EMPTY   : /^\S.*\S$/,
        MAX_50      : /^\S(.{1,50}\S)$/,
        ALPHABETIC  : /^\S([a-zA-Záàâãéèêíïóôõöúçñ]*\s*)*[a-zA-Z]$/,
        EMAIL       : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ALPHANUMERIC: /^\S(\w?\s?[áàâãéèêíïóôõöúçñ]?)*\w$/,
        NUMERIC     : /^\S\d*$/,
        PASSWORD    : /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/
    };

    /**
     *
     * @param itemsToValid
     * @enums NOT_EMPTY,  MAX_50, ALPHABETIC, ALPHANUMERIC, NUMERIC, PASSWORD, EMAIL
     * @returns {Array}
     */
    function init(itemsToValid){
        for(var i=0; i < itemsToValid.length; i++){
            itemsValidated.push(testRegex(itemsToValid[i]));
        }
        return itemsValidated;
    }

    function testRegex(itv){
        var itemValidated = itv;
        itemValidated.errors = [];

        for(var i=0; i < itemValidated.pattern.length; i++){
            var regex = pattern[itemValidated.pattern[i]];
            if(!itemValidated.value.match(regex))
                itemValidated.errors.push(itemValidated.pattern[i]);
        }
        return itemValidated;
    }

    return {
        init: init
    }
};


module.exports=validation;
/**
 * Module dependencies.
 */
var slugify = require('./slugify');
var abtManager = require('../services/abt-manager/abt-manager');
var _ = require('underscore');

module.exports = function() {

    var self = this;

    /**
      * Convert a tab to 4 spaces
      * @param {String} str Text to replace.
      * @return {String} replaced text.
      *
    */
    this.tabTo4Spaces = function(str) {
        return str.replace(/\t/g, '    ');
    }

    /**
      * Convert \n to ''
      * @param {String} str Text to replace.
      * @return {String} replaced text.
      *
    */
    this.removeBreakLines = function(str) {
        return str.replace(/\n/g, '');
    }

    /**
      * Convert \n to <br>
      * @param {String} str Text to replace.
      * @return {String} replaced text.
      *
    */
    this.nl2br = function(str) {
        return str.replace(/\n/g, '<br>');
    };

    /**
      * Convert <br> to \n
      * @param {String} str Text to replace.
      * @return {String} replaced text.
      *
    */
    this.br2nl = function(str) {
        return str.replace(/\n/g, '').replace(/<br>/g, '\n');
    };


    this.block = function (name) {
        var blocks  = this._blocks;
        content = blocks && blocks[name];

        return content ? content.join('\n') : null;
    }

    /**
     * getLibPath()
     * -----------
     * Get the lib path by environment
     * @return {String} path text
     */
    this.getLibPath = function () {
        var libraryVersion = package.viajerosFrameworkVersions.viajerosLibrary;
        var libPath = "/lib/styles";

        if(package.releaseVersion != "%RELEASE_NUMBER%"){
            libPath = "/frontend-library/styles/"+libraryVersion;
        }
        return libPath;
    }

    this.getBasePath = function () {
        var process = process || {};
        process.env = process.env || {};
        process.env.NODE_ENV = process.env.NODE_ENV || "development";
        var coreConfig = require('frontend-core').config;

        return coreConfig.goro.basePath;
    };

    this.getPhotoUrl = function(filename, folder, size, noExt) {
        if ( !filename ) return;

        folder = ( typeof folder == 'string' ) ? folder : 'fotos';
        size = ( typeof size == 'string' ) ? '-' + size : '';
        noExt = ( typeof noExt == 'boolean' ) ? noExt : false;

        var extension = (noExt) ? '' : '.jpg';
        var firstFolder = filename.substr(0,1);
        var secondFolder = filename.substr(0,2);

        var coreConfig = require('frontend-core').config;
        var cdnPath = coreConfig.statics.cdnImagesPath;

        var imagePath = cdnPath + "/" + folder + '/' + firstFolder + '/' + secondFolder + '/' + filename + size + extension;
        return imagePath;
    };

    this.getStaticPath = function () {
        var process = process || {};
        process.env = process.env || {};
        process.env.NODE_ENV = process.env.NODE_ENV || "development";
        var coreConfig = require('frontend-core').config;

        return coreConfig.statics.basePath;
    };

    this.contentFor = function (name, options) {
        var blocks = this._blocks || (this._blocks = {}),
            block  = blocks[name] || (blocks[name] = []);

        block.push(options.fn(this));
    };

    this.loadJs = function(env, options){
        var ret = "";
        var retJsList = (env == "development")? options.fn(this) : options.inverse(this);
        retJsList = retJsList.split(",");

        for(var i=0; i < retJsList.length; i++){
            ret = ret + '<script type="text/javascript" src="'+retJsList[i].trim()+'"></script>'
        }
        return ret;
    };
    this.ifCond = function(v1, v2, options){
        if(v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    };
    this.ifNot = function(v1, v2, options){
        if(v1 !== v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    };
    this.slugify = function(str){
        return slugify(str);
    };
    /**
     * {{capitalizeFirst}}
     * Capitalize first word in a sentence
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    this.capitalizeFirst = function (str) {
        if(str && typeof str === "string") {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    };

    /**
     * {{capitalizeEach}}
     * Capitalize each word in a sentence
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    this.capitalizeEach = function (str) {
        if(str && typeof str === "string") {
            return str.replace(/\w\S*/g, function (word) {
                return word.charAt(0).toUpperCase() + word.substr(1);
            });
        }
    };

    /**
     * {{center}}
     * Center a string using non-breaking spaces
     * @param  {[type]} str    [description]
     * @param  {[type]} spaces [description]
     * @return {[type]}        [description]
     */
    this.center = function (str, spaces) {
        if(str && typeof str === "string") {
            var space = '';
            var i = 0;
            while (i < spaces) {
                space += '&nbsp;';
                i++;
            }
            return "" + space + str + space;
        }
    };

    /**
     * {{dashify}}
     * Replace periods in string with hyphens.
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    this.dashify = function (str) {
        if(str && typeof str === "string") {
            return str.split(".").join("-");
        }
    };

    /**
     * {{hyphenate}}
     * Replace spaces in string with hyphens.
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    this.hyphenate = function (str) {
        if(str && typeof str === "string") {
            return str.split(" ").join("-");
        }
    };

    /**
     * {{lowercase}}
     * Make all letters in the string lowercase
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    this.lowercase = function (str) {
        if(str && typeof str === "string") {
            return str.toLowerCase();
        }
    };

    /**
     * {{safeString}}
     * Output a Handlebars safeString
     * @param  {[type]} str [description]
     * @return {[type]}       [description]
     */
    this.safeString = function (str) {
        if(str && typeof str === "string") {
            return new Utils.safeString(str);
        }
    };

    /**
     * {{sentence}}
     * Sentence case
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    this.sentence = function (str) {
        if(str && typeof str === "string") {
            return str.replace(/((?:\S[^\.\?\!]*)[\.\?\!]*)/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
    };

    /**
     * {{titleize}}
     * Title case. "This is Title Case"
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    this.titleize = function (str) {
        if(str && typeof str === "string") {
            var title = str.replace(/[ \-_]+/g, ' ');
            var words = title.match(/\w+/g);
            var capitalize = function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            };
            return ((function () {
                var i, len, results;
                results = [];
                for (i = 0, len = words.length; i < len; i++) {
                    var word = words[i];
                    results.push(capitalize(word));
                }
                return results;
            })()).join(' ');
        }
    };

    this.uppercase = function (options) {
        if(options && typeof options === "string") {
            return options.toUpperCase();
        } else if(options && typeof options === "object") {
            return options.fn(this).toUpperCase();
        }
    };

    this.reverse = function (str) {
        if(str && typeof str === "string") {
            return str.split('').reverse().join('');
        }
    };

    /**
     * {{count}}
     * Return the nuumber of occurrances of a string, within a string
     * @author: Jon Schlinkert <http://github.com/jonschlinkert>
     * @param  {String} str       The haystack
     * @param  {String} substring The needle
     * @return {Number}           The number of times the needle is found in the haystack.
     */
    this.count = function (str, substring) {
        if(str && typeof str === "string") {
            var n = 0;
            var pos = 0;
            var l = substring.length;
            while (true) {
                pos = str.indexOf(substring, pos);
                if (pos > -1) {
                    n++;
                    pos += l;
                } else {
                    break;
                }
            }
            return n;
        }
    };

    /**
     * {{replace}}
     * Replace occurrences of string "A" with string "B"
     * @author: Jon Schlinkert <http://github.com/jonschlinkert>
     * @param  {[type]} str [description]
     * @param  {[type]} a   [description]
     * @param  {[type]} b   [description]
     * @return {[type]}     [description]
     */
    this.replace = function (str, a, b) {
        if(str && typeof str === "string") {
            return str.split(a).join(b);
        }
    };

    /**
     * {{ellipsis}}
     * @author: Jon Schlinkert <http://github.com/jonschlinkert>
     * Truncate the input string and removes all HTML tags
     * @param  {String} str      The input string.
     * @param  {Number} limit    The number of characters to limit the string.
     * @param  {String} append   The string to append if charaters are omitted.
     * @return {String}          The truncated string.
     */
    this.ellipsis = function (str, limit, append) {
        if (Utils.isUndefined(append)) {
            append = '';
        }
        var sanitized = str.replace(/(<([^>]+)>)/g, '');
        if (sanitized.length > limit) {
            return sanitized.substr(0, limit - append.length) + append;
        } else {
            return sanitized;
        }
    };

    /**
     * {{truncate}}
     * Truncates a string given a specified `length`,
     * providing a custom string to denote an `omission`.
     * @param  {[type]} str      [description]
     * @param  {[type]} length   [description]
     * @param  {[type]} omission [description]
     * @return {[type]}          [description]
     */
    this.truncate = function (str, limit, omission) {
        if (omission) {
            omission = '';
        }
        if (str.length > limit) {
            return str.substring(0, limit - omission.length) + omission;
        } else {
            return str;
        }
    };

    /**
     * {{startsWith}}
     * @author: Dan Fox <http://github.com/iamdanfox>
     *
     * Tests whether a string begins with the given prefix.
     * Behaves sensibly if the string is null.
     * @param  {[type]} prefix     [description]
     * @param  {[type]} testString [description]
     * @param  {[type]} options    [description]
     * @return {[type]}            [description]
     *
     * @example:
     *   {{#startsWith "Goodbye" "Hello, world!"}}
     *     Whoops
     *   {{else}}
     *     Bro, do you even hello world?
     *   {{/startsWith}}
     */
    this.startsWith = function (prefix, str, options) {
        if ((str != null ? str.indexOf(prefix) : void 0) === 0) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    };
    this.isEven = function(conditional, options){
        if((conditional % 2) == 0) {
            return options.fn(this);
            } else {
            return options.inverse(this);
        }
    };
    this.isOdd = function(conditional, options){
        if((conditional % 2) == 0) {
            return options.inverse(this);
            } else {
            return options.fn(this);
        }
    };
    this.isLast = function(conditional, columns , options){
        if(( (conditional+1) % columns) == 0) {
            return options.fn(this);
            } else {
            return options.inverse(this);
        }
    };

	this.compare = function (left, operator, right, options) {
		/*jshint eqeqeq: false*/

		if (arguments.length < 3) {
			throw new Error('Handlerbars Helper "compare" needs 2 parameters');
		}

		if (options === undefined) {
			options = right;
			right = operator;
			operator = '===';
		}

		var operators = {
			'==': function (l, r) {
				return l == r;
			},
			'===': function (l, r) {
				return l === r;
			},
			'!=': function (l, r) {
				return l != r;
			},
			'!==': function (l, r) {
				return l !== r;
			},
			'<': function (l, r) {
				return l < r;
			},
			'>': function (l, r) {
				return l > r;
			},
			'<=': function (l, r) {
				return l <= r;
			},
			'>=': function (l, r) {
				return l >= r;
			},
			'typeof': function (l, r) {
				return typeof l == r;
			}
		};

		if (!operators[operator]) {
			throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
		}

		var result = operators[operator](left, right);

		if (result) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};

    this.stringify = function(str) {
        return JSON.stringify(str);
    };

    /****** AB Testing ********/

    /*
        Next to helpers works togheter in order to retrieve the needed block to display on the view.
        Example:

        {{#abtManager}}
            {{#abtCase "up"}}
                <p class="up">I am "Up"</p>
            {{/abtCase}}
            {{#abtCase "under"}}
                <p class="under">I am "Under"</p>
            {{/abtCase}}
            {{#abtCase "left"}}
                <p class="left">I am "Left"</p>
            {{/abtCase}}
            {{#abtCase "right"}}
                <p class="right">I am "Right"</p>
            {{/abtCase}}
            {{#abtCase "default"}}
                <p class="center">I am "Center"</p>
            {{/abtCase}}
        {{/abtManager}}

    */

    /**
      * This helper will return a html block to display on the view depending
      * on the ABTest requests.
      * @param {String} options.fn(this) html block from the view.
      * @return {String} replaced text.
      *
    */
    this.abtManager = function(id, res, options) {
        /* TODO: Replace what is in id with the required id from the backend. */
        var oABTManager = new abtManager(id, res);
        var oABTest = oABTManager.getABTest();

        var text = options.fn(this),
            expresion = /\{\abt\}([\s\S]*?)\{\/\abt\}/g,
            cases = self.removeBreakLines(text).trim(),
            matches = [],
            m,
            obj = {};

        while ((m = expresion.exec(cases)) != null) {
            if (m.index === expresion.lastIndex) {
                expresion.lastIndex++;
            }
            var value = m[1].split("_abDivisor_");
            obj[value[0]] = value[1];
        }

        //obj = JSON.parse('{' + matches.join(",") + '}');

        return obj[oABTest.value] != undefined ? self.br2nl(_.unescape(obj[oABTest.value])) : self.br2nl(_.unescape(obj['default']));
    };

    /**
      * This helper will return a readable string to be parsed and to be used on the above abt Manager helper.
      * @param {String} options.fn(this) html block from the view.
      * @return {String} readable string.
      *
    */
    this.abtCase = function(key, options) {
        return '{abt}'+key+'_abDivisor_'+ _.escape( self.nl2br( self.tabTo4Spaces( options.fn(this) ) ) ).trim() +'{/abt}';
    };

    this.tr = function(t, str) {
        return t(str);
    }

	return this;
};

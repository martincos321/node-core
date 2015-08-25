var crypto = require('crypto');

var xCrypt = function(){

    var method = 'AES-256-CBC';
    var secret           = "b14g3r0spVnt0k0mb14g3r0spVnt0k0m";

    function encrypt(message) {
        var iv = crypto.pseudoRandomBytes(16).toString('hex').substr(0,16);
        var encryptor = crypto.createCipheriv(method, secret, iv);
        var encrypted = new Buffer(iv).toString('base64') +"|"+ encryptor.update(message, 'utf8', 'base64') + encryptor.final('base64');
        return encrypted;
    }

    function generateHmac(encrypted){
        return crypto.createHmac('md5', secret).update(encrypted).digest('hex');
    }

    function decrypt(encrypted) {
        encrypted = encrypted.split("|");
        var iv = new Buffer(encrypted[0], 'base64').toString();
        var decryptor = crypto.createDecipheriv(method, secret, iv);
        return decryptor.update(encrypted[1], 'base64', 'utf8') + decryptor.final('utf8');
    }

    function validHmac(encrypted, hmac){
        return Boolean(generateHmac(encrypted, secret) == hmac);
    }

    function validateTsHash(hashTs, TTLm){
        var date1 = new Date();
        var date2 = new Date(hashTs);
        var timeDiff = Math.ceil((date1.getTime() - date2.getTime()) / 60000);
        return Boolean(timeDiff < TTLm);
    }

    return {
        encrypt         : encrypt,
        decrypt         : decrypt,
        validHmac       : validHmac,
        generateHmac    : generateHmac,
        validateTsHash  : validateTsHash
    }
}

module.exports = xCrypt;
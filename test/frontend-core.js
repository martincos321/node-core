var fc = require('..');
var expect = require("chai").expect;
var request = require('request');
var fcReq = fc.models.request;

GLOBAL.package = require("../../../package");
GLOBAL.config = require('../../../server/config/config');
GLOBAL.logger = fc.services.logger;
GLOBAL.cluster = null;
GLOBAL.env = 'test';

describe('FrontendCore', function () {

  describe('Services', function () {
//    describe('Abstract Facade', function () {
//      it('make an api request and return the response', function (done) {
//        var af = fc.services.abstractFacade;
//
//        var getContinents = af().get(new fcReq({
//          type: 'destinations',
//          method: 'apiSearchContinents',
//          search: {limit: 100},
//          model: fc.models.destination,
//          endpoint: fc.endpoints.destinations.apiSearchContinents
//        }));
//
//        getContinents.then(function (r) {
//          expect(r).have.property('data');
//          done();
//        }, function (err) {
//          done(err);
//        });
//
//      });
//    });

//    describe('Locale Resolver', function () {
//      var localeResolver = fc.services.localeResolver;
//      var host = 'dev.servers.despegar.it:3000';
//      var ip = '190.60.39.188'; // Venezuela
//
//      it('return a domain properties object with data of the given country', function (done) {
//        localeResolver(host, ip).then(function (response) {
//          expect(response.country).to.equal('VE');
//          done();
//        }, function (err) {
//          done(err);
//        });
//      });
//
//      it('return default country (ARG) due to disabled country', function (done) {
//        ip = '127.0.0.1';
//        localeResolver(host, ip).then(function (response) {
//          expect(response.country).to.equal('AR');
//          done();
//        }, function (err) {
//          done(err);
//        });
//      });
//    });
  });

  describe('Utils', function () {
    describe('Slugify', function () {
      it('return a slugified string', function (done) {
        var slugify = fc.utils.slugify;
        var str = "this string have dashes";
        var slugified = slugify(str);
        expect(slugified).equal('this-string-have-dashes');
        done();
      });
    });

    describe('i18n', function () {
      var i18n = fc.utils.i18n;

      i18n.configure({
        locales: ['es', 'pt', 'en'],
        defaultLocale: 'es',
        defaultLanguage: 'AR',
        supportRegion: true,
        directory: config.root + '/server/i18n'
      });

      it('return a translated string in spanish', function (done) {
        var key = "VIAJEROS";
        var trans = i18n.__(key);
        expect(trans).equal('Viajeros');
        done();
      });

      it('return a translated string in portuguese', function (done) {
        i18n.setLocale('pt_BR');
        var key = "VIAJEROS";
        var trans = i18n.__(key);
        expect(trans).equal('Viajantes');
        done();
      });
    });

  });

  describe('Models', function () {
    it('return an model object with specific properties', function (done) {

      var destinationModel = fc.models.destination({
        id: 999,
        shortDescriptions: 'Testing',
        slugs: {
          es: 'test-slug'
        }
      });

      var expectedModel = {
        id: 999,
        iataCode: undefined,
        shortDescriptions: 'Testing',
        descriptions: undefined,
        names: undefined,
        slugs: {
          es: 'test-slug'
        }
      }

      expect(JSON.stringify(destinationModel)).equal(JSON.stringify(expectedModel));
      done();
    });
  });

  describe('Endpoints', function () {
    it('return the endpoint for the given object', function (done) {

      var destinationEndpoints = fc.endpoints.destinations;

      expect(destinationEndpoints).to.be.an('object');
      expect(destinationEndpoints).have.property('apiSearchContinents');

      var expectedEndpointObj = {
        method:'get',
        path: fc.config.api.basePath + '/continents?limit=:limit'
      }

      expect(JSON.stringify(destinationEndpoints.apiSearchContinents)).equal(JSON.stringify(expectedEndpointObj));
      done();
    });
  });
});
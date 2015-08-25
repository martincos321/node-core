/**
 *
 * Domain properties
 * ------------------------
 * ------------------------
 *
 * Configuration for setting culture through the URL.
 * Use the pattern to define the URL.
 *
 */

var domains = [
    {
        pattern : /(\?|&)pais=es_AR/gi,
        lang    : "es",
        locale  : "es_AR",
        country : "AR",
        currency: "ARS",
        countryId: "20010"
    },
    {
        pattern : /(https?:\/\/)?(www\.)?viajantes\.com.*/gi,
        lang    : "pt",
        locale  : "pt_BR",
        country : "BR",
        currency: "BRL",
        countryId: "20028"
    },
    {
        pattern : /(\?|&)pais=pt_BR/gi,
        lang    : "pt",
        locale  : "pt_BR",
        country : "BR",
        currency: "BRL",
        countryId: "20028"
    },
    {
        pattern : /(\?|&)pais=es_PE/gi,
        lang    : "es",
        locale  : "es_PE",
        country : "PE",
        currency: "PEN",
        countryId: "20158"
    },
    {
        pattern : /(\?|&)pais=es_UY/gi,
        lang    : "es",
        locale  : "es_UY",
        country : "UY",
        currency: "UYU",
        countryId: "20209"
    },
    {
        pattern : /(\?|&)pais=es_VE/gi,
        lang    : "es",
        locale  : "es_VE",
        country : "VE",
        currency: "VEF",
        countryId: "20213"
    },
    {
        pattern : /(\?|&)pais=es_CL/gi,
        lang    : "es",
        locale  : "es_CL",
        country : "CL",
        currency: "CLP",
        countryId: "20042"
    },
    {
        pattern : /(\?|&)pais=es_CO/gi,
        lang    : "es",
        locale  : "es_CO",
        country : "CO",
        currency: "COP",
        countryId: "20045"
    },
    {
        pattern : /(\?|&)pais=es_CR/gi,
        lang    : "es",
        locale  : "es_CR",
        country : "CR",
        currency: "CRC",
        countryId: "20046"
    },
    {
        pattern : /(\?|&)pais=es_DO/gi,
        lang    : "es",
        locale  : "es_DO",
        country : "DO",
        currency: "USD",
        countryId: "20055"
    },
    {
        pattern : /(\?|&)pais=es_EC/gi,
        lang    : "es",
        locale  : "es_EC",
        country : "EC",
        currency: "USD",
        countryId: "20057"
    },
    {
        pattern : /(\?|&)pais=es_GT/gi,
        lang    : "es",
        locale  : "es_GT",
        country : "GT",
        currency: "USD",
        countryId: "20081"
    },
    {
        pattern : /(\?|&)pais=es_HN/gi,
        lang    : "es",
        locale  : "es_HN",
        country : "HN",
        currency: "USD",
        countryId: "20086"
    },
    {
        pattern : /(\?|&)pais=es_MX/gi,
        lang    : "es",
        locale  : "es_MX",
        country : "MX",
        currency: "MXN",
        countryId: "20141"
    },
    {
        pattern : /(\?|&)pais=es_NI/gi,
        lang    : "es",
        locale  : "es_NI",
        country : "NI",
        currency: "USD",
        countryId: "20149"
    },
    {
        pattern : /(\?|&)pais=es_BO/gi,
        lang    : "es",
        locale  : "es_BO",
        country : "BO",
        currency: "USD",
        countryId: "20027"
    },
    {
        pattern : /(\?|&)pais=es_PA/gi,
        lang    : "es",
        locale  : "es_PA",
        country : "PA",
        currency: "USD",
        countryId: "20157"
    },
    {
        pattern : /(\?|&)pais=es_PR/gi,
        lang    : "es",
        locale  : "es_PR",
        country : "PR",
        currency: "USD",
        countryId: "20165"
    },
    {
        pattern : /(\?|&)pais=es_PY/gi,
        lang    : "es",
        locale  : "es_PY",
        country : "PY",
        currency: "USD",
        countryId: "20168"
    },
    {
        pattern : /(\?|&)pais=es_SV/gi,
        lang    : "es",
        locale  : "es_SV",
        country : "SV",
        currency: "USD",
        countryId: "20188"
    },
    {
        pattern : /(\?|&)pais=es_US/gi,
        lang    : "es",
        locale  : "es_US",
        country : "US",
        currency: "USD",
        countryId: "20208"
    },
    {
        pattern : /(\?|&)pais=es_ES/gi,
        lang    : "es",
        locale  : "es_ES",
        country : "ES",
        currency: "EUR",
        countryId: "20061"
    }
];

module.exports = domains;
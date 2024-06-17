const handlebarshelp = require('handlebars');

// Definindo o helper "eq"
handlebarshelp.registerHelper('eq', function(a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
});

module.exports = handlebarshelp;

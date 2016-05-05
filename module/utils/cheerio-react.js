var ReactDOMServer = require('react-dom/server');
var cheerio = require('cheerio');

module.exports = function( reactClass ) {
    var staticMarkup = ReactDOMServer.renderToStaticMarkup(reactClass);
    var $ = cheerio.load(staticMarkup);
    return $.root().children().first();
};
const http = require('http');
var url = require('url');
const pageData = require('../Modules/pageData.js');
const page = require('../Modules/pageHeader.js');
const address = require('../Modules/address.js');

let server = http.createServer((req, res) => {
    console.log(`request was made: ${req.url}`);
    //header//
    if (req.method === 'GET') {
        var pathname = url.parse(req.url).pathname;
        switch (pathname) {
            case '/':
                res.end(pageData.helloWebApplication);
                break;
            case address.StyleCss:
                res.end(pageData.helloWorldCss);
                break;
            case address.about:
                res.end(pageData.aboutMe);
                break;
            case address.content:
                res.end(pageData.content);
                break;
            case address.helloWorld:
                res.end(pageData.helloWorld);
                break;
            case address.saeed:
                res.end(pageData.saeed);
                break;
            //user put nothing in url//
            case address.style404:
                res.end(pageData.notFoundCss);
                break;
            default:
                res.end(pageData.notFound);
                break;
        }
    }
});
server.listen(page.port, page.hostname, () => {
    console.log(`listening to port ${page.port}`);
});



const http = require('http');
const url = require('url');
const pageData = require('../Modules/pageData.js');
const page = require('../Modules/pageHeader.js');
const address = require('../Modules/address.js');

let server = http.createServer((req, res) => {
    console.log(`request was made: ${req.url}`);
    //header//
    if (req.method === 'GET') {
        let pathname = url.parse(req.url).pathname;
        switch (pathname) {
            case address.root:
                res.end(pageData.rootPage);
                break;
            case address.json:
                res.end(pageData.json);
                break;
            case address.StyleCss:
                res.end(pageData.rootPageCss);
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



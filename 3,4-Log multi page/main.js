const http = require('http');
var url = require('url');
const pageData = require('../Modules/pageData.js');
const page = require('../Modules/pageHeader.js');


let server = http.createServer((req, res) => {
    console.log(`request was made: ${req.url}`);
    //header//
    if (req.method === 'GET') {
        var pathname = url.parse(req.url).pathname;
        switch (pathname) {
            case '/':
                res.end(pageData.helloWebApplication);
                break;
            case '/css/style.css':
                res.end(pageData.helloWorldCss);
                break;
            case '/root':
                res.end(pageData.rootPage);
                break;
            case '/json':
                res.end(pageData.json);
                break;
            case '/about':
                res.end(pageData.aboutMe);
                break;
            case '/content':
                res.end(pageData.content);
                break;
            case '/helloWorld':
                res.end(pageData.helloWorld);
                break;
            //user put nothing in url//
            case '/css/404style.css':
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



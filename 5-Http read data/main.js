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
        }
    }
});
server.listen(page.port, page.hostname, () => {
    console.log(`listening to port ${page.port}`);
});



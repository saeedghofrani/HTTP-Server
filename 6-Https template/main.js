const http = require('http');
const url = require('url');
const pageData = require('../Modules/pageData');
const page = require('../Modules/pageHeader.js');


let server = http.createServer((req, res) => {
    console.log(`request was made: ${req.url}`);
    //header//
    if (req.method === 'GET') {
        let pathname = url.parse(req.url).pathname;
        switch (pathname) {
            case '/team':
                res.end(pageData.userTable);
                break;
            case '/css/userTableStyle.css':
                res.end(pageData.userTableCss);
                break;
            case '/js/CRUD.js':
                res.end(pageData.userTableCRUD);
                break;
            case '/js/callData.js':
                res.end(pageData.userTableCallData);
                break;
            case '/js/GUI.js':
                res.end(pageData.userTableGUI);
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



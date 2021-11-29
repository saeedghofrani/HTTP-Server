"use strict";
const http = require('http');
const url = require('url');
const page = require('../../Modules/pageHeader.js');
const addressDictionary = require('../../Modules/addressDictionary.js');

let server = http.createServer((req, res) => {
    console.log(`request was made: ${req.url}`);
    //header//
    if (req.method === 'GET') {
        const pathname = url.parse(req.url).pathname;
        if (addressDictionary.hasOwnProperty(pathname))
            res.end(addressDictionary[pathname]);
        else
            res.end(addressDictionary['/notFound']);
    }
});
server.listen(page.port, page.hostname, () => {
    console.log(`listening to port ${page.port}`);
});



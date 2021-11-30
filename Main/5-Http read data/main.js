"use strict";
const http = require('http');
const url = require('url');
const page = require('../../Modules/pageHeader.js');
const {htmlWA} = require('../../Modules/addressDictionary.js');
//create server//
let server = http.createServer((req, res) => {
    //log url request//
    console.log(`request was made: ${req.url}`);
    if (req.method === 'GET') {
        //get user input// 
        const pathname = url.parse(req.url).pathname;
        //locate address in dictionary//
        if (htmlWA.hasOwnProperty(pathname))
            res.end(htmlWA[pathname]);
        else
            res.end(htmlWA['/notFound']);
    }
});
server.listen(page.port, page.hostname, () => {
    console.log(`listening to port ${page.port}`);
});


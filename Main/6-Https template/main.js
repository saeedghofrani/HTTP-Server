"use strict";
const http = require('http');
const url = require('url');
const page = require('../../Modules/pageHeader.js');
const { template } = require('../../Modules/addressDictionary.js');
//create server//
let server = http.createServer((req, res) => {
    //log url request//
    console.log(`request was made: ${req.url}`);
    //header//
    if (req.method === 'GET') {
        //get user input// 
        const pathname = url.parse(req.url).pathname;
        //locate address in dictionary//
        if (template.hasOwnProperty(pathname))
            res.end(template[pathname]);
        else
            res.end(template['/notFound']);
    }
});
server.listen(page.port, page.hostname, () => {
    console.log(`listening to port ${page.port}`);
});
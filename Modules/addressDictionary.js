"use strict";
const pageData = require('./readPage.js');
try {
    const addressesDictinary = {
        '/root': pageData('../../page/root/index.html'),
        '/json': pageData('../../page/JSON/file.json'),
        '/me': pageData('../../page/Saeed/page.html'),
        '/css/style.css': pageData('../../page/root/css/style.css'),
        '/notFound': pageData('../../page/Not Found/404page.html'),
        '/css/404style.css': pageData('../../page/Not Found/css/404style.css'),
        '/about': pageData('../../page/About Me/page.html'),
        '/content': pageData('../../page/Content/page.html'),
        '/helloWorld': pageData('../../page/Hello World/page.html'),
        '/': pageData('../../page/Hello Web Application/page.html'),
        '/css/userTableStyle.css': pageData('../../page/user Table/css/userTableStyle.css'),
        '/js/CRUD.js': pageData('../../page/user Table/js/CRUD.js'),
        '/js/callData.js': pageData('../../page/user Table/js/callData.js'),
        '/js/GUI.js': pageData('../../page/user Table/js/GUI.js'),
        '/user': pageData('../../page/user Table/index.html')
    };
    module.exports = addressesDictinary;
} catch (error) {
    console.log(`an error occurred while reading ERROR: ${error}`);
}

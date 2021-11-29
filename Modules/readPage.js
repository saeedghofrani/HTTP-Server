"use strict";
const fs = require('fs');
function readPage(path) {
    const data = fs.readFileSync(path, {encoding: 'utf-8'});
    return data;
}
module.exports = readPage;
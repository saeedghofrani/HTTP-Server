const fs = require('fs');
function readPage(path) {
    return data = fs.readFileSync(path, {encoding: 'utf-8'});
}
module.exports = readPage;
var fs = require('fs');
var helpers = require('../helpers');

module.exports = function(name) {
    helpers.load(name, function(err, dashboard) {
        fs.writeFileSync(name + '.json', JSON.stringify(dashboard, null, 4));
    });
};

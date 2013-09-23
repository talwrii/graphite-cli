var fs = require('fs');
var helpers = require('../helpers');

module.exports = function (dump) {
    if (!new RegExp(/.json$/).test(dump)) {
        dump += '.json';
    }

    var contents = fs.readFileSync(dump);
    var dashboard = JSON.parse(contents);

    helpers.save(dashboard.state.name, dashboard.state);
};

var fs = require('fs');
var helpers = require('../helpers');

module.exports = function(dashboardName, options) {
    helpers.load(dashboardName, function(err, dashboard) {
        var dumpPath = options.path || '';
        var dumpFilename = dumpPath + '/' + dashboardName + '.json';
        fs.writeFileSync(dumpFilename, JSON.stringify(dashboard, null, 4));
    });
};

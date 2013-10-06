var async = require('async');
var fs = require('fs');
var path = require('path');
var repl = require('repl');

var GraphiteClient = require('../client');

module.exports = function() {
    var server = repl.start({
        prompt: 'graphite> ',
        input: process.stdin,
        output: process.stdout
    });

    var client = new GraphiteClient();

    server.context.client = client;

    var graphiterc = path.join(process.cwd(), '.graphiterc');

    if (fs.existsSync(graphiterc)) {
        var contents = JSON.parse(fs.readFileSync(graphiterc));

        async.each(contents.preloadDashboards, function(dashboardName) {
            client.loadAndCacheDashboard(dashboardName);
        });
    }
};

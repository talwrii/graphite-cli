var _ = require('underscore');
var request = require('request');

var FIND_URL = GRAPHITE_URL + '/dashboard/find/';

module.exports = function(search) {
    var options = {
        qs: { query: search },
        url: FIND_URL
    };

    request.post(options, function(err, resp, body) {
        if (err) {
            console.log('ERROR: ' + err.message);
            return;
        }

        var result = JSON.parse(body);
        var dashboards = _.chain(result.dashboards)
            .pluck('name')
            .value()
            .sort();

        dashboards.forEach(function(dashboard) {
            console.log(dashboard);
        });
    });
};

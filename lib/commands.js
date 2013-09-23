// 3rd party
var request = require('request');

// 1st party
exports.cat = require('./commands/cat');

var LOAD_URL = GRAPHITE_URL + '/dashboard/load';

exports.load = function(dashboard, callback) {
    var options = {
        url: LOAD_URL + '/' + dashboard
    };

    request.get(options, function(err, resp, body) {
        if (err) {
            if (callback && typeof callback === 'function') {
                callback(err);
            }
        } else {
            var data = JSON.parse(body);

            if (data.error) {
                if (callback && typeof callback === 'function') {
                    callback(new Error(data.error));
                }
            } else {
                if (callback && typeof callback === 'function') {
                    callback(null, data);
                }
            }
        }
    });
};

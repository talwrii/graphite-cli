var request = require('request');

var LOAD_URL = GRAPHITE_URL + '/dashboard/load';
var SAVE_URL = GRAPHITE_URL + '/dashboard/save';

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

exports.save = function(dashboard, state, callback) {
    var options = {
        form: { state: JSON.stringify(state) },
        url: SAVE_URL + '/' + dashboard
    };

    request.post(options, function(err, resp, body) {
        if (err) {
            if (callback && typeof callback === 'function') {
                callback(err);
            }
        } else {
            var data = JSON.parse(body);

            if (callback && typeof callback === 'function') {
                if (data.success) {
                    callback();
                } else {
                    callback(new Error('Unknown'));
                }
            }
        }
    });
};

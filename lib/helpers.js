var _ = require('underscore');
var request = require('request');

var DELETE_URL = process.env.GRAPHITE_CLI_URL + '/dashboard/delete/';
var LOAD_URL = process.env.GRAPHITE_CLI_URL + '/dashboard/load';
var SAVE_URL = process.env.GRAPHITE_CLI_URL + '/dashboard/save';

exports.delete = function(dashboard, callback) {
    var options = {
        url: DELETE_URL + '/' + dashboard
    };

    request.get(options, function(err, resp, body) {
        if (err) {
            callback(err);
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

exports.getGraphs = function(dashboard, callback) {
    load(dashboard, function(err, dashboard) {
        if (err) {
            callback(err);
        } else {
            var graphs = _.chain(dashboard.state.graphs)
                .map(function(graph) { return graph[1]; })
                .pluck('title')
                .value();

            callback(null, graphs);
        }
    });
};

var load = exports.load = function (dashboard, callback) {
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

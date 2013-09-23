var _ = require('underscore');
var helpers = require('../helpers');

module.exports = function(dashboard) {
    helpers.load(dashboard, function(err, dashboard) {
        if (err) {
            callback(err);
        } else {
            var targets = _.chain(dashboard.state.graphs)
                .map(function(graph) { return graph[1]; })
                .pluck('target')
                .flatten()
                .uniq()
                .value();

            targets.sort().forEach(function(target) {
                console.log(target);
            });
        }
    });
};

var _ = require('underscore');
var helpers = require('../helpers');

module.exports = function(source, target) {
    helpers.getGraphs(source, function(err, sourceGraphs) {
        if (!err) {
            helpers.getGraphs(target, function(err, targetGraphs) {
                if (!err) {
                    var graphs = _.difference(sourceGraphs, targetGraphs);

                    graphs.sort().forEach(function(graph) {
                        console.log(graph);
                    });
                }
            });
        }
    });
};

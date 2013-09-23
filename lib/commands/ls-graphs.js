var helpers = require('../helpers');

module.exports = function(dashboard) {
    helpers.getGraphs(dashboard, function(err, graphs) {
        if (!err) {
            graphs.sort().forEach(function(graph) {
                console.log(graph);
            });
        }
    });
};

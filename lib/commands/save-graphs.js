var fs = require('fs');
var helpers = require('../helpers');

module.exports = function(dump) {
    if (!new RegExp(/.json$/).test(dump)) {
        dump += '.json';
    }

    var contents = fs.readFileSync(dump);
    var dumpedGraphs = JSON.parse(contents);

    helpers.load(dumpedGraphs.name, function(err, dashboard) {
        dashboard.state.graphs.forEach(function(graph) {
            var title = graph[1].title;

            dumpedGraphs.graphs.forEach(function(dumpedGraph) {
                if (dumpedGraph.title === title) {
                    graph[1].target = dumpedGraph.stats;
                }
            });
        });

        helpers.save(dashboard.state.name, dashboard.state);
    });
};

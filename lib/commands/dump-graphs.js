var fs = require('fs');
var helpers = require('../helpers');

module.exports = function(name) {
    helpers.load(name, function(err, dashboard) {
        var customDashboard = {
            name: dashboard.state.name,
            graphs: []
        };

        dashboard.state.graphs.forEach(function(graph) {
            var title = graph[1].title;
            var target = graph[1].target;

            customDashboard.graphs.push({
                title: title,
                stats: target
            });
        });

        fs.writeFileSync(name + '.json', JSON.stringify(customDashboard, null, 4)); 
    });
};

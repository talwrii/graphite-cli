var _ = require('underscore');

var Graph = require('./graph');

var Dashboard = function(data) {
    this.name = data.state.name;

    this.graphs = this._convertRawGraphs(data);
};

Dashboard.prototype = {
    getGraph: function(title) {
        return this.graphs[title];
    },

    _convertRawGraphs: function(data) {
        return data.state.graphs.map(function(graph) {
            return new Graph(graph[1]);
        });
    }
};

module.exports = Dashboard;

var _ = require('underscore');

var Graph = require('./graph');

var Dashboard = function(name) {
    this.name = name;
    this.config = {
        graph: {},
        refresh: {},
        time: {}
    };
};

Dashboard.load = function(data) {
    var dashboard = new Dashboard(data.state.name);
    dashboard.graphs = data.state.graphs.map(function(graph) {
        return Graph.load(graph[1]);
    });
    return dashboard;
};

Dashboard.prototype = {
    colorByAlias: function(color, alias) {
        this.graphs.forEach(function(graph) {
            graph.colorByAlias(color, alias);
        });
    },

    disableRefresh: function() {
        this.config.refesh.enabled = false;
    },

    enableRefresh: function() {
        this.config.refresh.enabled = true;
    },

    getGraph: function(title) {
        return _.find(this.graphs, function(graph) { return graph.title === title; });
    },

    setGraphSize: function(height, width) {
        this.height = height;
        this.width = width;
    },

    setRelativeTimeRange: function(from, until) {
        this.config.graph.from = from;
        this.config.graph.until = until;
    },

    setRefreshInterval: function(interval) {
        this.config.refresh.interval = interval;
    }
};

module.exports = Dashboard;

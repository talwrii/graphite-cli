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

    copyGraph: function(title, newTitle) {
        var graph = this.getGraph(title);

        if (graph) {
            this.graphs.push(Graph.copy(graph, newTitle));
        }
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

    newGraph: function(title) {
        return _.chain(new Graph({ title: title })
            .tap(function(graph) { this.graphs.push(graph); })
            .value();
    },

    renameAlias: function(oldAlias, newAlias) {
        this.graphs.forEach(function(graph) {
            graph.renameAlias(oldAlias, newAlias);
        });
    },

    setGraphSize: function(width, height) {
        this.config.graph.width = width;
        this.config.graph.height = height;
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

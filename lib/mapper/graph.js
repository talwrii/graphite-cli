var _ = require('underscore');

var Target = require('./target');

var Graph = function(data, overrides) {
    data = data || {};
    overrides = overrides || {};

    this.drawNullAsZero = data.drawNullAsZero;
    this.from = data.from;
    this.hideLegend = data.hideLegend;
    this.lineMode = data.lineMode;
    this.title = overrides.title || data.title;
    this.until = data.until;
};

Graph.copy = function(data, newTitle) {
    return new Graph(data, {
        title: newTitle
    });
};

Graph.load = function(data) {
    var graph = new Graph(data);
    graph.targets = _.map(data.target, function(targetData) {
        return new Target(targetData);
    });
    return graph;
};

Graph.prototype = {
    capitalizeTitle: function() {

    },

    colorByAlias: function(color, alias) {
        _.chain(this.targets)
            .filter(function(target) { return target.alias === alias; })
            .each(function(target) { target.color = color; });
    },

    printTargetsCallStacks: function() {
        this.targets.forEach(function(target) {
            target.callStack.forEach(function(call, index) {
                if (index === 0) {
                    console.log(call.name);
                } else {
                    var shaft = '';

                    for (var i = 0; i < index; i++) {
                        shaft += '-';
                    }

                    console.log(shaft + '> ' + call.name);
                }
            });

            console.log();
        });
    },

    renameAlias: function(oldAlias, newAlias) {
        _.chain(this.targets)
            .filter(function(target) { return target.alias === oldAlias; })
            .each(function(target) { target.alias = newAlias; });
    }
};

module.exports = Graph;

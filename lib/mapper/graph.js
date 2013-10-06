var _ = require('underscore');

var Target = require('./target');

var Graph = function(title) {
    this.title = title;
};

Graph.load = function(data) {
    var graph = new Graph(data.title);
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
                    console.log(call);
                } else {
                    var shaft = '';

                    for (var i = 0; i < index; i++) {
                        shaft += '-';
                    }

                    console.log(shaft + '> ' + call);
                }
            });

            console.log();
        });
    }
};

module.exports = Graph;

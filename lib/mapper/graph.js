var _ = require('underscore');

var Target = require('./target');

var Graph = function(data) {
    this.title = data.title;

    this.targets = this._convertRawTargets(data);
};

Graph.prototype = {
    capitalizeTitle: function() {

    },

    colorByAlias: function(color, alias) {
        _.chain(this.targets)
            .filter(function(target) { return target.alias === alias; })
            .each(function(target) { target.color = color; });
    },

    _convertRawTargets: function(data) {
        return _.map(data.target, function(targetData) { return new Target(targetData); });
    }
};

module.exports = Graph;

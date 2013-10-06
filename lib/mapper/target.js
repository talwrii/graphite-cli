var Target = function(data) {
    this.data = data;

    this.callStack = [];
    this._evalRawData(data);
};

Target.prototype = {
    _evalRawData: function(data) {
        var self = this;

        var alias = function(stat, alias) {
            self.alias = alias;
            self.callStack.unshift('alias');
        };

        var aliasByNode = function(stat) {
            self.callStack.unshift('aliasByNode');
        };

        var averageSeries = function(stat) {
            self.callStack.unshift('averageSeries');
        };

        var color = function(stat, colorName) {
            self.color = colorName;
            self.callStack.unshift('color');
        };

        var derivative = function(stat) {
            self.callStack.unshift('derivative');
        };

        var removeBelowValue = function(stat, below) {
            self.callStack.unshift('removeBelowValue: ' + below);
        };

        var scale = function(stat, factor) {
            self.callStack.unshift('scale: ' + factor);
        };

        var scaleToSeconds = function(stat) {
            self.callStack.unshift('scaleToSeconds');
        };

        var sum = function(stat) {
            self.callStack.unshift('sum');
        };

        var sumSeries = function(stat) {
            self.callStack.unshift('sumSeries');
        };

        var summarize = function(stat, interval) {
            self.callStack.unshift('summarize');
        };

        // No promises are made as to whether this'll cover all dashboards. In fact,
        // it's pretty much guaranteed not to.
        var jsCompliantData = data.replace(/((servers|stats)[A-Za-z0-9\.\*_\-\[\]\s]*)/, "\"$1\"");

        eval(jsCompliantData);
    }
};

module.exports = Target;

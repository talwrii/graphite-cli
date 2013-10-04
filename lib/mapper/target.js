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
        };

        var aliasByNode = function(stat) {
            self.callStack.unshift('aliasByNode');
        };

        var averageSeries = function(stat) {
            self.callStack.unshift('averageSeries');
        };

        var color = function(stat, colorName) {
            self.color = colorName;
        };

        var derivative = function(stat) {
            self.callStack.unshift('derivative');
        };

        var removeBelowValue = function(stat) {
            self.callStack.unshift('removeBelowValue');
        };

        var scale = function(stat) {
            self.callStack.unshift('scale');
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

        var jsCompliantData = data.replace(/((servers|stats)[A-Za-z0-9\.\*_\-\[\]\s]*)/, "\"$1\"");

        eval(jsCompliantData);
    }
};

module.exports = Target;

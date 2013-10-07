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

            self.callStack.unshift({
                name: 'alias',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var aliasByNode = function(stat) {
            self.callStack.unshift({
                name: 'aliasByNode',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var alpha = function(stat) {
            self.callStack.unshift({
                name: 'alpha',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var averageSeries = function(stat) {
            self.callStack.unshift({
                name: 'averageSeries',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var color = function(stat, colorName) {
            self.color = colorName;
            self.callStack.unshift({
                name: 'color',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var derivative = function(stat) {
            self.callStack.unshift({
                name: 'derivative',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var legendValue = function(stat) {
            self.callStack.unshift({
                name: 'legendValue',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var lineWidth = function(stat) {
            self.callStack.unshift({
                name: 'lineWidth',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var movingAverage = function(stat) {
            self.callStack.unshift({
                name: 'movingAverage',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var removeBelowValue = function(stat, below) {
            self.callStack.unshift({
                name: 'removeBelowValue',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var scale = function(stat, factor) {
            self.callStack.unshift({
                name: 'scale',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var scaleToSeconds = function(stat) {
            self.callStack.unshift({
                name: 'scaleToSeconds',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var sum = function(stat) {
            self.callStack.unshift({
                name: 'sum',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var sumSeries = function(stat) {
            self.callStack.unshift({
                name: 'sumSeries',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var summarize = function(stat, interval) {
            self.callStack.unshift({
                name: 'summarize',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var timeShift = function(stat) {
            self.callStack.unshift({
                name: 'timeShift',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        // No promises are made as to whether this'll cover all dashboards. In fact,
        // it's pretty much guaranteed not to.
        var jsCompliantData = data.replace(/((servers|stats)[A-Za-z0-9\.\*_\-\[\]\s]*)/, "\"$1\"");

        eval(jsCompliantData);
    }
};

module.exports = Target;

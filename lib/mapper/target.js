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
                call: 'alias',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var aliasByNode = function(stat) {
            self.callStack.unshift({
                call: 'aliasByNode',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var alpha = function(stat) {
            self.callStack.unshift({
                call: 'alpha',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var averageSeries = function(stat) {
            self.callStack.unshift({
                call: 'averageSeries',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var color = function(stat, colorName) {
            self.color = colorName;
            self.callStack.unshift({
                call: 'color',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var derivative = function(stat) {
            self.callStack.unshift({
                call: 'derivative',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var legendValue = function(stat) {
            self.callStack.unshift({
                call: 'legendValue',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var lineWidth = function(stat) {
            self.callStack.unshift({
                call: 'lineWidth',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var movingAverage = function(stat) {
            self.callStack.unshift({
                call: 'movingAverage',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var removeBelowValue = function(stat, below) {
            self.callStack.unshift({
                call: 'removeBelowValue',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var scale = function(stat, factor) {
            self.callStack.unshift({
                call: 'scale',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var scaleToSeconds = function(stat) {
            self.callStack.unshift({
                call: 'scaleToSeconds',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var sum = function(stat) {
            self.callStack.unshift({
                call: 'sum',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var sumSeries = function(stat) {
            self.callStack.unshift({
                call: 'sumSeries',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var summarize = function(stat, interval) {
            self.callStack.unshift({
                call: 'summarize',
                args: Array.prototype.slice.call(arguments, 1)
            });
        };

        var timeShift = function(stat) {
            self.callStack.unshift({
                call: 'timeShift',
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

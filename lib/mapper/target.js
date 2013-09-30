var Target = function(data) {
    this.data = data;

    this._evalRawData(data);
};

Target.prototype = {
    _evalRawData: function(data) {
        var self = this;

        var alias = function(stat, alias) {
            self.alias = alias;
        };

        var averageSeries = function(stat) {

        };

        var color = function(stat, colorName) {
            self.color = colorName;
        };

        var derivative = function(stat) {

        };

        var scaleToSeconds = function(stat) {

        };

        var sumSeries = function(stat) {

        };

        var summarize = function(stat, interval) {

        };

        var jsCompliantData = data.replace(/((servers|stats)[A-Za-z0-9\.\*_\-]*)/, "\"$1\"");

        eval(jsCompliantData);
    }
};

module.exports = Target;

var cp = require('./cp');
var rm = require('./rm');

module.exports = function(source, target) {
    cp(source, target, false, function() {
        rm(source);
    });
};

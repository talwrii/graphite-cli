var commands = require('../commands.js');

module.exports = function(dashboard, callback) {
    commands.load(dashboard, function(err, dashboard) {
        if (err) {
            console.log('Error: ' + err.message);
        } else {
            console.log(JSON.stringify(dashboard));
        }
    });
};

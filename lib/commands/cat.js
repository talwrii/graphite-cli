var helpers = require('../helpers.js');

module.exports = function(dashboard, callback) {
    helpers.load(dashboard, function(err, dashboard) {
        if (err) {
            console.log('Error: ' + err.message);
        } else {
            console.log(JSON.stringify(dashboard));
        }
    });
};

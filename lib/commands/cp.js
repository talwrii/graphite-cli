var helpers = require('../helpers');

module.exports = function(source, target, force, callback) {
    helpers.load(source, function(err, dashboardData) {
        if (err) {
            console.log('Error: ' + err.message);
        } else {
            dashboardData.state.name = target;

            helpers.save(target, dashboardData.state, callback);
        }
    });
};

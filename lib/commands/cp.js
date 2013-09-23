var helpers = require('../helpers');

function cp(source, target, force, callback) {
    helpers.load(source, function(err, dashboard) {
        if (err) {
            console.log('Error: ' + err.message);
        } else {
            dashboard.state.name = target;

            helpers.save(target, dashboard.state, callback);
        }
    });
}

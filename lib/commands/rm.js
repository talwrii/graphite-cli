var request = require('request');

var DELETE_URL = process.env.GRAPHITE_CLI_URL + '/dashboard/delete/';

module.exports = function (dashboard) {
    var options = {
        url: DELETE_URL + '/' + dashboard
    };

    request.get(options, function(err, resp, body) {
        if (err) {
            console.log('ERROR: ' + err.message);
            return;
        } else {
            if (resp.statusCode === 200) {
            } else {
                console.log('Not deleted ;(');
            }
        }
    });
};

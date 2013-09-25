var GraphiteClient = require('../lib/client');

var client = new GraphiteClient();

client.newDashboard('rt-some-dashboard', function(err, dashboard) {
    if (err) {
        console.log('Error: ' + err.message);
    } else {
        console.log('Dashboard data: ' + JSON.stringify(dashboard.data));
    }
});

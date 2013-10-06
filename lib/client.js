var fs = require('fs');

var Dashboard = require('./mapper').Dashboard;
var Serializer = require('./serializer');

var helpers = require('./helpers');

var Client = function() {
    this.url = process.env.GRAPHITE_CLI_URL;
};

Client.prototype = {
    loadDashboardDump: function(dumpFilename) {
        return Dashboard.load(JSON.parse(fs.readFileSync(dumpFilename)));
    },

    loadDashboard: function(name, callback) {
        helpers.load(name, function(err, data) {
            if (callback && typeof callback === 'function') {
                callback(err, Dashboard.load(data));
            }
        });
    },

    newDashboard: function(name, callback) {
        return new Dashboard(name);
    },

    saveDashboard: function(dashboard, callback) {
        helpers.save(dashboard.name, Serialier.serializeDashboard(dashboard), callback);
    }
};

module.exports = Client;

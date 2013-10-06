var fs = require('fs');

var Dashboard = require('./mapper').Dashboard;
var Serializer = require('./serializer');

var helpers = require('./helpers');
var touch = require('./commands/touch');

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
        var self = this;

        touch(name, function(err) {
            if (err) {
                callback(err);
            } else {
                self.loadDashboard(name, callback);
            }
        }); 
    },

    saveDashboard: function(dashboard, callback) {
        var serializedDashboard = Serializer.serializeDashboard(dashboard);

        var options = {

        };
    }
};

module.exports = Client;

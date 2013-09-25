var Dashboard = require('./mapper/dashboard');
var helpers = require('./helpers');
var touch = require('./commands/touch');

var Client = function() {
    this.url = process.env.GRAPHITE_CLI_URL;
};

Client.prototype = {
    loadDashboard: function(name, callback) {
        helpers.load(name, function(err, data) {
            if (callback && typeof callback === 'function') {
                callback(err, new Dashboard(data));
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
    }
};

module.exports = Client;

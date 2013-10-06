var fs = require('fs');

var _ = require('underscore');

var Dashboard = require('./mapper').Dashboard;
var helpers = require('./helpers');
var Serializer = require('./serializer');


var Client = function() {
    this.cache = [];
    this.isAutoSaveEnabled = false;
    this.url = process.env.GRAPHITE_CLI_URL;
};

Client.prototype = {
    deleteDashboard: function(dashboard) {
        helpers.delete(dashboard.name);
    },

    disableAutoSave: function() {
        this.isAutoSaveEnabled = false;
    },

    enableAutoSave: function() {
        this.isAutoSaveEnabled = true;
    },

    getDashboard: function(name) {
        return _.find(this.cache, function(dashboard) { return dashboard.name === name; });
    },

    loadAndCacheDashboard: function(dashboardName, callback) {
        var self = this;

        this.loadDashboard(dashboardName, function(err, dashboard) {
            if (!err) {
                self.cache.push(dashboard);
            }
        });
    },

    loadDashboardDump: function(dumpFilename) {
        return Dashboard.load(JSON.parse(fs.readFileSync(dumpFilename)));
    },

    loadDashboard: function(name, callback) {
        helpers.load(name, function(err, data) {
            if (callback && typeof callback === 'function') {
                if (err) {
                    callback(err);
                } else {
                    callback(null, Dashboard.load(data));
                }
            }
        });
    },

    moveGraph: function(sourceDashboardName, targetDashboardName, graphTitle) {

    },

    newDashboard: function(name, callback) {
        return new Dashboard(name);
    },

    saveDashboard: function(dashboard, callback) {
        helpers.save(dashboard.name, Serializer.serializeDashboard(dashboard), callback);
    }
};

module.exports = Client;

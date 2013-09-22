#!/usr/bin/env node

var _ = require('underscore');
var commander = require('commander');
var request  = require('request');

commander.version('0.0.1')
    .option('-c, --conf <conf>', 'Configuration file');

commander.command('ls [search]')
    .description('List all RT dashboards')
    .action(ls);

commander.command('rm <dashboard>')
    .description('Delete a dashboard')
    .action(rm);

commander.parse(process.argv);

var conf = commander.conf && require(commander.conf); 
var hostname = conf && conf.hostname || 'localhost';
var port = conf && conf.port || 8000;
var graphiteUrl = util.format('http://%s:%d', hostname, port);

function ls(search) {
    var options = {
        qs: { query: search },
        url: graphiteUrl + '/dashboard/find/'
    };

    request.post(options, function(err, resp, body) {
        if (err) {
            console.log('ERROR: ' + err.message);
            return;
        }

        var result = JSON.parse(body);
        var dashboards = _.chain(result.dashboards)
            .pluck('name')
            .value()
            .sort();

        dashboards.forEach(function(dashboard) {
            console.log(dashboard + ' @ ' + 'http://graphite.uber.com/dashboard/#' + dashboard);
        });
    });
}

function rm(dashboard) {
    var options = {
        url: graphiteUrl + '/dashboard/delete'
    };

    request.get(options, function(err, resp, body) {
        if (err) {
            console.log('ERROR: ' + err.message);
            return;
        } else {
            if (resp.statusCode === 200) {
                console.log('Deleted!');
            } else {
                console.log('Not deleted ;(');
            }
        }
    });
}

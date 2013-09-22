#!/usr/bin/env node

var _ = require('underscore');
var commander = require('commander');
var request  = require('request');
var util = require('util');

var graphiteUrl;

commander.version('0.0.1')
    .option('-c, --conf <conf>', 'Configuration file', null, './graphite-config.js');

commander.command('cp [source] [target]')
    .description('Copy source dashboard to target dashboard')
    .action(cp);

commander.command('ls [search]')
    .description('List dashboards')
    .action(ls);

commander.command('mv [source] [target]')
    .description('Move source dashboard to target dashboard')
    .action(mv);

commander.command('rm <dashboard>')
    .description('Delete a dashboard')
    .action(rm);

commander.command('touch <dashboard>')
    .description('Create a new empty dashboard')
    .action(touch);

commander.parse(process.argv);

function init() {
    var conf = commander.conf && require(commander.conf);
    var hostname = conf && conf.hostname || 'localhost';
    var port = conf && conf.port || 8000;
    graphiteUrl = util.format('http://%s:%d', hostname, port);
}

function cp(source, target) {

}

function ls(search) {
    init();

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
            console.log(dashboard);
        });
    });
}

function mv(source, target) {

}

function rm(dashboard) {
    init();

    var options = {
        url: graphiteUrl + '/dashboard/delete/' + dashboard
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

function touch(dashboard) {
    init();

    var options = {
        form: {
            state: JSON.stringify({
                name: dashboard,
                defaultGraphParams: {
                    from: '-2weeks',
                    until: '-',
                    height: '300',
                    width: '400'
                },
                graphSize: {
                    height: 250,
                    width: 400
                },
                graphs: [],
                refreshConfig: {
                    enabled: false,
                    interval: 60000
                },
                timeConfig: {
                    type: 'relative',
                    relativeStartQuantity: '2',
                    relativeStartUnits: 'weeks',
                    relativeUntilQuantity: '',
                    relativeUntilUnits: 'now',
                    startDate: '2013-09-21T19:03:12',
                    startTime: '9:00AM',
                    endDate: '2013-09-21T19:03:12',
                    endTime: '5:00PM'
                }
            })
        },
        url: graphiteUrl + '/dashboard/save/' + dashboard
    };

    request.post(options, function(err, resp, body) {
        if (err) {
            console.log('ERROR: ' + err.message);
            return;
        } else {
            if (resp.statusCode === 200) {
                console.log('Created!');
            } else {
                console.log('Not created: ' + body);
            }
        }
    });
}

#!/usr/bin/env node

global.GRAPHITE_URL = process.env.GRAPHITE_CLI_URL;

// stdlib
var fs = require('fs');
var util = require('util');

// 3rd party
var _ = require('underscore');
var commander = require('commander');
var request  = require('request');

// 1st party
var commands = require('./lib/commands');
var helpers = require('./lib/helpers');
var getGraphs = helpers.getGraphs;
var load = helpers.load;
var save = helpers.save;

var DELETE_URL = GRAPHITE_URL + '/dashboard/delete/';

if (!GRAPHITE_URL) {
    console.log('Error: GRAPHITE_CLI_URL is not set');
    process.exit(1);
}

commander.version('0.1.0');

commander.command('cat <dashboard>')
    .description('Dumps raw dashboard definition')
    .action(commands.cat);

commander.command('cp <source> <target>')
    .description('Copy source dashboard to target dashboard')
    .option('-f, --force', 'Forces an override for existing target')
    .action(commands.cp);

commander.command('diff <source> <target>')
    .description('Lists the difference in graphs between source and target dashboards')
    .action(commands.diff);

commander.command('dump <dashboard>')
    .description('Dumps dashboard JSON to a file of the same name')
    .action(commands.dump);

commander.command('dump-graphs <dashboard>')
    .description('Dumps pretty printed graphs in custom format to file of same name')
    .action(commands.dumpGraphs);

commander.command('ls [search]')
    .description('Lists dashboards')
    .action(commands.ls);

commander.command('ls-graphs <dashboard>')
    .description('Lists graphs in a dashboard')
    .action(lsGraphs);

commander.command('ls-targets <dashboard>')
    .description('Lists all targets in all graphs in a dashboard')
    .action(lsTargets);

commander.command('mv <source> <target>')
    .description('Move source dashboard to target dashboard')
    .action(mv);

commander.command('rm <dashboard>')
    .description('Delete a dashboard')
    .action(rm);

commander.command('save-dump <dump>')
    .description('Saves dump back to dashboard')
    .action(saveDump);

commander.command('save-graphs <dump>')
    .description('Saves graphs dump back to dashboard')
    .action(saveGraphs);

commander.command('touch <dashboard>')
    .description('Create a new empty dashboard')
    .action(touch);

commander.parse(process.argv);

function lsGraphs(dashboard) {
    getGraphs(dashboard, function(err, graphs) {
        if (!err) {
            graphs.sort().forEach(function(graph) {
                console.log(graph);
            });
        }
    });
}

function lsTargets(dashboard) {
    load(dashboard, function(err, dashboard) {
        if (err) {
            callback(err);
        } else {
            var targets = _.chain(dashboard.state.graphs)
                .map(function(graph) { return graph[1]; })
                .pluck('target')
                .flatten()
                .uniq()
                .value();

            targets.sort().forEach(function(target) {
                console.log(target);
            });
        }
    });
}

function mv(source, target) {
    cp(source, target, false, function() {
        rm(source);
    });
}

function rm(dashboard) {
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
}

function saveDump(dump) {
    if (!new RegExp(/.json$/).test(dump)) {
        dump += '.json';
    }

    var contents = fs.readFileSync(dump);
    var dashboard = JSON.parse(contents);

    save(dashboard.state.name, dashboard.state);
}

function saveGraphs(dump) {
    if (!new RegExp(/.json$/).test(dump)) {
        dump += '.json';
    }

    var contents = fs.readFileSync(dump);
    var dumpedGraphs = JSON.parse(contents);

    load(dumpedGraphs.name, function(err, dashboard) {
        dashboard.state.graphs.forEach(function(graph) {
            var title = graph[1].title;

            dumpedGraphs.graphs.forEach(function(dumpedGraph) {
                if (dumpedGraph.title === title) {
                    graph[1].target = dumpedGraph.stats;
                }
            });
        });

        save(dashboard.state.name, dashboard.state);
    });
}

function touch(dashboard) {
    save(dashboard, {
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
    });
}

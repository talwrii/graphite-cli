#!/usr/bin/env node

var _ = require('underscore');
var commander = require('commander');
var fs = require('fs');
var request  = require('request');
var util = require('util');

var graphiteUrl;

commander.version('0.0.1')
    .option('-c, --conf <conf>', 'Configuration file', null, './graphite-config.js');

commander.command('cat <dashboard>')
    .description('Dumps raw dashboard definition')
    .action(cat);

commander.command('cp <source> <target>')
    .description('Copy source dashboard to target dashboard')
    .action(cp);

commander.command('diff <source> <target>')
    .description('Lists the difference in graphs between source and target dashboards')
    .action(diff);

commander.command('dump <dashboard>')
    .description('Dumps dashboard JSON to a file of the same name')
    .action(dump);

commander.command('dump-graphs <dashboard>')
    .description('Dumps pretty printed graphs in custom format to file of same name')
    .action(dumpGraphs);

commander.command('ls [search]')
    .description('Lists dashboards')
    .action(ls);

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

function init() {
    var conf = commander.conf && require(commander.conf);
    var hostname = conf && conf.hostname || 'localhost';
    var port = conf && conf.port || 8000;
    graphiteUrl = util.format('http://%s:%d', hostname, port);
}

function cat(dashboard, callback) {
    init();

    load(dashboard, function(err, dashboard) {
        console.log(JSON.stringify(dashboard));
    });
}

function cp(source, target, callback) {
    load(source, function(err, dashboard) {
        dashboard.state.name = target;
        save(target, dashboard.state, callback);
    });
}

function diff(source, target) {
    getGraphs(source, function(err, sourceGraphs) {
        if (!err) {
            getGraphs(target, function(err, targetGraphs) {
                if (!err) {
                    var graphs = _.difference(sourceGraphs, targetGraphs);

                    graphs.sort().forEach(function(graph) {
                        console.log(graph);
                    });
                }
            });
        }
    });
}

function dump(name) {
    load(name, function(err, dashboard) {
        fs.writeFileSync(name + '.json', JSON.stringify(dashboard, null, 4));
    });
}

function dumpGraphs(name) {
    load(name, function(err, dashboard) {
        var customDashboard = {
            name: dashboard.state.name,
            graphs: []
        };

        dashboard.state.graphs.forEach(function(graph) {
            var title = graph[1].title;
            var target = graph[1].target;

            customDashboard.graphs.push({
                title: title,
                stats: target
            });
        });

        fs.writeFileSync(name + '.json', JSON.stringify(customDashboard, null, 4)); 
    });
}

function getGraphs(dashboard, callback) {
    load(dashboard, function(err, dashboard) {
        if (err) {
            callback(err);
        } else {
            var graphs = _.chain(dashboard.state.graphs)
                .map(function(graph) { return graph[1]; })
                .pluck('title')
                .value();

            callback(null, graphs);
        }
    });
}

function load(dashboard, callback) {
    init();

    var options = {
        url: graphiteUrl + '/dashboard/load/' + dashboard
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

        if (callback && typeof callback === 'function') {
            callback(err, JSON.parse(body));
        }
    });
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
    cp(source, target, function() {
        rm(source);
    });
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
            } else {
                console.log('Not deleted ;(');
            }
        }
    });
}

function save(dashboard, state, callback) {
    init();

    var options = {
        form: { state: JSON.stringify(state) },
        url: graphiteUrl + '/dashboard/save/' + dashboard
    };

    request.post(options, function(err, resp, body) {
        if (err) {
            console.log('ERROR: ' + err.message);
            return;
        } else {
            if (resp.statusCode === 200) {
                if (callback && typeof callback === 'function') {
                    callback();
                }
            } else {
                console.log('Not created: ' + body);
            }
        }
    });
}

function saveDump(dump) {
    if (!new RegExp(/.js$/).test(dump)) {
        dump += '.js';
    }

    var contents = fs.readFileSync(dump);
    var dashboard = JSON.parse(contents);

    save(dashboard.state.name, dashboard.state);
}

function saveGraphs(dump) {
    if (!new RegExp(/.js$/).test(dump)) {
        dump += '.js';
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

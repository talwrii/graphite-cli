#!/usr/bin/env node

global.GRAPHITE_URL = process.env.GRAPHITE_CLI_URL;

var commander = require('commander');
var commands = require('./lib/commands');

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
    .action(commands.lsGraphs);

commander.command('ls-targets <dashboard>')
    .description('Lists all targets in all graphs in a dashboard')
    .action(commands.lsTargets);

commander.command('mv <source> <target>')
    .description('Move source dashboard to target dashboard')
    .action(commands.mv);

commander.command('rm <dashboard>')
    .description('Delete a dashboard')
    .action(commands.rm);

commander.command('save-dump <dump>')
    .description('Saves dump back to dashboard')
    .action(commands.saveDump);

commander.command('save-graphs <dump>')
    .description('Saves graphs dump back to dashboard')
    .action(commands.saveGraphs);

commander.command('touch <dashboard>')
    .description('Create a new empty dashboard')
    .action(commands.touch);

commander.parse(process.argv);

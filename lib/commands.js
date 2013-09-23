exports.cat = require('./commands/cat');
exports.cp = require('./commands/cp');
exports.diff = require('./commands/diff');
exports.dump = require('./commands/dump');
exports.dumpGraphs = require('./commands/dump-graphs');
exports.ls = require('./commands/ls');

module.exports = [
    {
        command: 'cat <dashboard-name>',
        description: 'Dumps raw dashboard definition to stdout',
        action: require('./commands/cat')
    },

    {
        command: 'cp <source> <target>',
        description: 'Copies source dashboard to target dashboard',
        options: [
            ['-f, --force', 'Forces an override for existing target']
        ],
        action: require('./commands/cp')
    }
];

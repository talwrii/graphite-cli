var repl = require('repl');

var GraphiteClient = require('../client');

module.exports = function() {
    var server = repl.start({
        prompt: 'graphite> ',
        input: process.stdin,
        output: process.stdout
    });

    server.context.client = new GraphiteClient();
};

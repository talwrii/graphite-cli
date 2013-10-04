var GraphiteClient = require('../lib/client');

var client = new GraphiteClient();

var dashboard = client.loadDashboardDump('dumps/monitor4.json');
var graph = dashboard.getGraph('CPU - Grids');
graph.printTargetsCallStacks();

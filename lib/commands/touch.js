var _ = require('underscore');
var helpers = require('../helpers');

var blankDashboard = {
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
};

module.exports = function (name, callback) {
    var newDashboard = _.clone(blankDashboard);
    newDashboard.name = name;

    helpers.save(name, newDashboard, callback);
};

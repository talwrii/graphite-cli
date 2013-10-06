var Serializer = {
    serializeDashboard: function(dashboard) {
        return {
            name: dashboard.name,

            defaultGraphParams: {
                height: dashboard.config.graph.height || 270,
                width: dashboard.config.graph.width || 310,
                from: dashboard.config.graph.from || '-1hours',
                until: dashboard.config.graph.until || '-'
            },

            graphSize: {
                height: dashboard.config.graph.height || 270,
                width: dashboard.config.graph.width || 310,
            },

            graphs: [],

            refreshConfig: {
                enabled: dashboard.config.refresh.enabled || true,
                interval: dashboard.config.refresh.interval || 60000
            },

            timeConfig: {
                startDate: dashboard.config.time.startDate || '2013-10-06T00:00:00',
                startTime: dashboard.config.time.startTime || '8:00 AM',
                endDate: dashboard.config.time.endDate || '2013-10-06T12:00:00',
                endTime: dashboard.config.time.endTime || '12:00 PM',
                type: dashboard.config.time.type || 'relative'
            }
        };
    }
};

module.exports = Serializer;

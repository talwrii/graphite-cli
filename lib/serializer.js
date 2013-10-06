var Serializer = {
    serializeDashboard: function(dashboard) {
        return JSON.stringify({
            state: {
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
                    startDate: dashboard.config.time.startDate,
                    startTime: dashboard.config.time.startTime,
                    endDate: dashboard.config.time.endDate,
                    endTime: dashboard.config.time.endTime,
                    type: dashboard.config.time.type
                }
            }
        });
    }
};

module.exports = Serializer;

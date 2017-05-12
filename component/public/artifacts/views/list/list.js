application.views.NotifierList = Vue.extend({
	template: "#notifierList",
	data: function() {
		return {
			notifications: [],
			limit: 100,
			offset: 0,
			connections: [],
			connection: null,
			highestId: null,
			lowestId: null,
			notification: null,
			properties: []
		};
	},
	activate: function(done) {
		var self = this;
		nabu.utils.ajax({
			url: "${server.root()}api/connection",
			success: function(response) {
				var result = JSON.parse(response.responseText);
				if (result.ids) {
					nabu.utils.arrays.merge(self.connections, result.ids);
				}
				done();
			}
		})
	},
	methods: {
		loadMore: function(connection) {
			var self = this;
			nabu.utils.ajax({
				url: "${server.root()}api/notifier/notification?connectionId=" + connection + "&offset=" + self.offset + "&limit=" + self.limit + (self.lowestId != null ? "&fromId=" + self.lowestId : ""),
				success: function(response) {
					var result = JSON.parse(response.responseText);
					if (result.notifications) {
						nabu.utils.arrays.merge(self.notifications, result.notifications);
					}
					if (self.notifications.length) {
						self.highestId = self.notifications[0].id;
						self.lowestId = self.notifications[self.notifications.length - 1].id;
					}
					else {
						self.highestId = null;
						self.lowestId = null;
					}
				}
			});
		},
		show: function(notification) {
			var self = this;
			nabu.utils.ajax({
				url: "${server.root()}api/notifier/notification/" + notification.id + "/property?connectionId=" + self.connection,
				success: function(response) {
					var result = JSON.parse(response.responseText);
					self.properties.splice(0, self.properties.length);
					if (result.properties) {
						nabu.utils.arrays.merge(self.properties, result.properties);
					}
					self.notification = notification;
				}
			});
		}
	},
	watch: {
		connection: function(newValue) {
			if (newValue) {
				this.notifications.splice(0, this.notifications.length);
				this.offset = 0;
				this.highestId = null;
				this.lowestId = null;
				this.loadMore(newValue);
			}
		}
	}
});
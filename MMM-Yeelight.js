/*
	MagicMirror² : Yeelight LED Bulb Control
	=========================================
	Developer : Zulkifli Mohamed (putera)
	E-mail : mr.putera@gmail.com
*/

Module.register("MMM-Yeelight", {

	// Default configurations
	defaults: {
		devicesInfo: []
	},

	start: function() {
		var self = this;
	},

	notificationReceived: function(notification, payload, sender) {
		//
	},

	socketNotificationReceived: function(notification, payload) {
		var self = this;

		if (notification == 'YEELIGHT_NETWORK_SEARCH_RESULT') {
			//
		}
	}
});
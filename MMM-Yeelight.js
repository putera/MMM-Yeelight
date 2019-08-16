/*
	MagicMirror² : Yeelight LED Bulb Control
	=========================================
	A MagicMirror² Module for controlling the Yeelight LED Bulb

	Developer : Zulkifli Mohamed (putera)
	E-mail : mr.putera@gmail.com
*/

Module.register("MMM-Yeelight", {

	// Default module configurations
	defaults: {
		lights: []
	},

	socketNotificationReceived: function(notification, payload) {
		var self = this;

		if (notification == 'TURN_ON_LIGHT') {
			this.sendSocketNotification('TURN_ON_LIGHT', {config: this.config, payload: payload});
		} else if (notification == 'TURN_OFF_LIGHT') {
			this.sendSocketNotification('TURN_OFF_LIGHT', {config: this.config, payload: payload});
		}
	}
});
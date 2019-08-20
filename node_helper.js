/*
	MagicMirror² : Yeelight Bulb Control
	=========================================
	A MagicMirror² Module for controlling the Yeelight Bulb

	Developer : Zulkifli Mohamed (putera)
	E-mail : mr.putera@gmail.com
*/

var NodeHelper = require("node_helper");
var Lookup = require('node-yeelight-wifi').Lookup;
let look;

module.exports = NodeHelper.create({
	requiresVersion: "2.1.0",

	start: function() {
		console.log("[MMM-Yeelight] Starting Yeelight modules...");
		try {
			console.log("[MMM-Yeelight] Looking for lights on the network...");
			this.look = new Lookup();
		} catch(err) {
			console.log(err);
		}
	},

	turnOnLight: function(config, params) {
		setTimeout(() =>
		{
			let lights = this.look.getLights();
			for (var i = 0; i < lights.length; i++)
			{
				let light = config.lights.find(l => l.ip === lights[i].host);
				if (light && lights[i].power == false) {
					lights[i].setPower('on', params.timer);
				}
			}
		}, 1000);
	},

	turnOffLight: function(config, params) {
		setTimeout(() =>
		{
			let lights = this.look.getLights();
			for (var i = 0; i < lights.length; i++)
			{
				let light = config.lights.find(l => l.ip === lights[i].host);
				if (light && lights[i].power == false) {
					lights[i].setPower('off', params.timer);
				}
			}
		}, 1000);
	},

	socketNotificationReceived: function(notification, payload)
	{
		if (notification === 'TURN_ON_LIGHT') {
			this.turnOnLight(payload.config, payload.payload);
		} else if (notification === 'TURN_OFF_LIGHT') {
			this.turnOffLight(payload.config, payload.payload);
		}
	}

});
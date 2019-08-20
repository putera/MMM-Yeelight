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
			look = new Lookup();
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
				let light = lights[i];
				if (light.power == false) {
					light.setPower('on', params.timer);
				}
			}
		}, 1500);
		/*var self = this;
		try {
			look = new Lookup();
			look.on("detected",(l) => {
				let lightInfo = config.lights.find(light => light.ip === l.host);
				if (lightInfo && l.power == false)
					l.setPower('on', params.timer);
			});
		} catch(err) {
			console.log(err);
		}*/
	},

	turnOffLight: function(config, params) {
		setTimeout(() =>
		{
			let lights = this.look.getLights();
			for (var i = 0; i < lights.length; i++)
			{
				let light = lights[i];
				if (light.power == true) {
					light.setPower('off', params.timer);
				}
			}
		}, 1500);
		/*var self = this;
		try {
			look = new Lookup();
			look.on("detected",(l) => {
				let lightInfo = config.lights.find(light => light.ip === l.host);
				if (lightInfo && l.power == true)
					l.setPower('off', params.timer);
			});
		} catch(err) {
			console.log(err);
		}*/
	},

	socketNotificationReceived: function(notification, payload)
	{
		if (notification === 'TURN_ON_LIGHT')
		{
			this.turnOnLight(payload.config, payload.payload);
		}
		else if (notification === 'TURN_OFF_LIGHT')
		{
			this.turnOffLight(payload.config, payload.payload);
		}
	}

});
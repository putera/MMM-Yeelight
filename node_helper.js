/*
	MagicMirror² : Yeelight LED Bulb Control
	=========================================
	A MagicMirror² Module for controlling the Yeelight LED Bulb

	Developer : Zulkifli Mohamed (putera)
	E-mail : mr.putera@gmail.com
*/

var NodeHelper = require("node_helper");
var Lookup = require('node-yeelight-wifi').Lookup;
var look;

module.exports = NodeHelper.create({
	start: function() {
		console.log("[MMM-Yeelight] Starting Yeelight modules...");
	},

	turnOnLight: function(config, params) {
		var self = this;
		try {
      		look = new Lookup();
			look.on("detected",(l) => {
				let lightInfo = config.lights.find(lightInfo => lightInfo.ip === l.ip);
				if (lightInfo)
					l.setPower('on');
			});
	    } catch(err) {
			console.log(err);
	    }
	},

	turnOffLight: function(config, params) {
		var self = this;
		try {
      		look = new Lookup();
			look.on("detected",(l) => {
				let lightInfo = config.lights.find(lightInfo => lightInfo.ip === l.ip);
				if (lightInfo)
					l.setPower('off');
			});
	    } catch(err) {
			console.log(err);
	    }
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
	},

});
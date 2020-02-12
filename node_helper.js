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
				if (config.lights.length > 0)
				{
					let light = config.lights.find(l => l.ip === lights[i].host);
					if (light && lights[i].power == false) {
						lights[i].setPower('on', params.timer);
					}
				}
				else
				{
					if (lights[i].power == false) {
						lights[i].setPower('on', params.timer);
					}
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
				if (config.lights.length > 0)
				{
					let light = config.lights.find(l => l.ip === lights[i].host);
					if (light && lights[i].power == true) {
						lights[i].setPower('off', params.timer);
					}
				}
				else
				{
					if (lights[i].power == true) {
						lights[i].setPower('off', params.timer);
					}
				}
			}
		}, 1000);
	},

	LightChangeColor: function(config, params) {
		var color;
		if (params == 'red' || params == 'merah') {
			color = [255,0,0];
		} else if (params == 'green' || params == 'hijau') {
			color = [0,255,0];
		} else if (params == 'blue' || params == 'biru') {
			color = [0,0,255];
		} else if (params == 'pink' || params == 'merah jambu') {
			color = [255,0,255];
		} else if (params == 'purple' || params == 'unggu') {
			color = [155,0,255];
		} else if (params == 'white' || params == 'putih') {
			color = [255,255,255];
		} else if (params == 'yellow' || params == 'kuning') {
			color = [255,255,0];
		} else if (params == 'orange' || params == 'oren' || params == 'jingga') {
			color = [255,130,0];
		}

		setTimeout(() =>
		{
			let lights = this.look.getLights();
			for (var i = 0; i < lights.length; i++)
			{
				if (config.lights.length > 0)
				{
					let light = config.lights.find(l => l.ip === lights[i].host);
					if (light && lights[i].power == true) {
						lights[i].setRGB(color);
						lights[i].setBright(50);
					}
				}
				else
				{
					if (lights[i].power == true) {
						lights[i].setRGB(color);
						lights[i].setBright(50);
					}
				}
			}
		}, 1000);
	},

	LightChangeBright: function(config, params) {
		var bright;
		if (params == 'dim' || params == 'dimmed' || params == 'malap' || params == 'gelap') {
			bright = 20;
		} else {
			bright = 100;
		}

		setTimeout(() =>
		{
			let lights = this.look.getLights();
			for (var i = 0; i < lights.length; i++)
			{
				if (config.lights.length > 0)
				{
					let light = config.lights.find(l => l.ip === lights[i].host);
					if (light && lights[i].power == true) {
						lights[i].setBright(bright);
					}
				}
				else
				{
					if (lights[i].power == true) {
						lights[i].setBright(bright);
					}
				}
			}
		}, 1000);
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
		else if (notification === 'TURN_ON_LIGHT_COLOR')
		{
			this.turnOnLight(payload.config, {timer: 2000});
			this.LightChangeColor(payload.config, payload.payload);
		}
		else if (notification === 'LIGHT_CHANGE_COLOR')
		{
			this.LightChangeColor(payload.config, payload.payload);
		}
		else if (notification === 'LIGHT_CHANGE_BRIGHT')
		{
			this.LightChangeBright(payload.config, payload.payload);
		}
	}
});
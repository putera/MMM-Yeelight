/*
	MagicMirror² : Yeelight LED Bulb Control
	=========================================
	Developer : Zulkifli Mohamed (putera)
	E-mail : mr.putera@gmail.com
*/

var NodeHelper = require("node_helper");
var Lookup = require('node-yeelight-wifi').Lookup;
var listDevices;
var listDevicesItem;
var look;

module.exports = NodeHelper.create({
	start: function() {
		console.log("[MMM-Yeelight] Starting Yeelight modules...");
	},

});
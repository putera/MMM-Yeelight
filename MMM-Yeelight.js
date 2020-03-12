/*
	MagicMirror² : Yeelight Bulb Control
	=========================================
	A MagicMirror² Module for controlling the Yeelight Bulb

	Developer : Zulkifli Mohamed (putera)
	E-mail : mr.putera@gmail.com
*/

Module.register("MMM-Yeelight", {
	requiresVersion: "2.1.0",

	// Default module configurations
	defaults: {
		lights: []
	},

	getTranslations: function() {
		return {
			"ms-my": "translations/ms-my.json",
			"en": "translations/en.json"
		}
	},

	getCommands: function(reg) {
		if (reg.constructor.name == 'TelegramBotCommandRegister')
		{
			reg.add({
				command: 'light',
				description : this.translate("TELBOT_LIGHT"),
				callback : 'cmd_light',
				args_pattern : [/^on|off/i],
				args_mapping : ['onoff']
			});
		}
	},

	cmd_light: function (command, handler) {
		var text = ""; var moduleFound = 0;

		// Check if MMM-Yeelight is installed on your MagicMirror
		MM.getModules().enumerate((m) => {
			if (m.name !== 'MMM-Yeelight') {
				moduleFound = 1;
			}
		});

		if (moduleFound == 0)
		{
			text = this.translate("TELBOT_LIGHT_NOT_INSTALLED");
		}
		else
		{
			if (handler.args !== null) {
				var stat = handler.args['onoff'].toLowerCase();
				if (stat == 'on')
				{
					this.sendSocketNotification('TURN_ON_LIGHT', {config: this.config, payload: {timer: 2000}});
					text = this.translate("TELBOT_LIGHT_TURNING_ON");
				}
				else if (stat == 'off')
				{
					this.sendSocketNotification('TURN_OFF_LIGHT', {config: this.config, payload: {timer: 2000}});
					text = this.translate("TELBOT_LIGHT_TURNING_OFF");
				}
			} else {
				text = this.translate("TELBOT_LIGHT_SPEFICY");
			}
		}

		handler.say("TEXT", text, {parse_mode:'Markdown'});
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'SHOW_ALERT')
		{
			payload.message = this.translate(payload.message);
			this.sendNotification(notification, payload);
		}
    },

	notificationReceived: function(notification, payload, sender) {
		var self = this;
		switch(notification)
		{
			case 'TURN_ON_LIGHT':
				this.sendSocketNotification('TURN_ON_LIGHT', {config: this.config, payload: payload});
			break;			
			case 'TURN_OFF_LIGHT':
				this.sendSocketNotification('TURN_OFF_LIGHT', {config: this.config, payload: payload});
			break;			
			case 'TURN_ON_LIGHT_COLOR':
				this.sendSocketNotification('TURN_ON_LIGHT_COLOR', {config: this.config, payload: payload});
			break;
			case 'LIGHT_CHANGE_COLOR':
				this.sendSocketNotification('LIGHT_CHANGE_COLOR', {config: this.config, payload: payload});
			break;
			case 'LIGHT_ON_FLOW':
				this.sendSocketNotification('LIGHT_ON_FLOW', {config: this.config, payload: payload});
			break;			
			default:
		}		
	}
});

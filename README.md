# MagicMirror² : Yeelight LED Bulb Control
A MagicMirror² Module for controlling the Yeelight LED Bulb

## Installation
1. Navigate into your MagicMirror's `modules` folder
2. Execute `git clone https://github.com/putera/MMM-Yeelight.git`

## Using the module
To use this module, add it to the modules array in the `config/config.js` file:
You may use `MMM-AssistantMk2` from `https://github.com/eouia/MMM-AssistantMk2` to trigger the command

```javascript
modules: [
    {
        module: 'MMM-Yeelight',
        config: {
            // See 'Configuration options' for more information.
            devicesInfo: [
            	{ alias: 'YEELIGHT_NAME_1', ip: 'YEELIGHT_IP_ADDRESS_1'},
            	{ alias: 'YEELIGHT_NAME_2', ip: 'YEELIGHT_IP_ADDRESS_2'},
            	...
            ]
        }
    }
]
```

## Configuration Options
The following properties can be configured:

| **Option** | **Description** |
| --- | --- |
| `devicesInfo` | List of all your Yeelight bulb |

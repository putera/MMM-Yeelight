# MagicMirror² : Yeelight LED Bulb Control
A MagicMirror² Module for controlling the Yeelight LED Bulb

## Installation
1. Navigate into your MagicMirror's `modules` folder
2. Execute `git clone https://github.com/putera/MMM-Yeelight.git`
3. Run `npm install`

## Using the module
To use this module, add it to the modules array in the `config/config.js` file:

You may use `MMM-AssistantMk2` from https://github.com/eouia/MMM-AssistantMk2 to trigger the command

```javascript
modules: [
    {
        module: 'MMM-Yeelight',
        config: {
            // See 'Configuration options' for more information.
            lights: [
            	{ name: 'My Kitchen Light 1', ip: '192.168.1.10'},
            	{ name: 'Living Room 1', ip: '192.168.1.11'},
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
| `lights` | List of all your Yeelight bulb |

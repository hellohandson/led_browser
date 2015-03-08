var five = require("johnny-five"),
	board = new five.Board(), 
	led,
	toggleState = false,
	active = true;


board.on("ready", function() {
  	console.log('And the LED is ready to fireeeeee!!!');
  	led = new five.Led(13);
	setInterval(toggleLED, 300);

	function toggleLED(){
		if (active) {
			toggleState = !toggleState;

			if (toggleState) led.on();
			else led.off();
		}

	}
});
console.log("\n Waiting for the device to connect... bee boh bee bohhhh");


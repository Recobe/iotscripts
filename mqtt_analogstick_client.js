var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost');

client.on('connect', function () {
  client.subscribe('analogStick', function (err) {
    if (err) {
	console.log(err);
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
})

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost');

client.on('connect', function () {
for(let i=0; i<10000; i++){
 client.publish('/joystick/positionX', '1');
console.log('Sent 1');
}
client.end();
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})

var coap        = require('coap')
  , server      = coap.createServer()
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost');

let ids = [];

client.on('connect', function () {
  client.subscribe('marco/nfc', function (err) {
    if (err) {
	console.log(err);
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  ids.push(message.toString());
})


server.on('request', function(req, res) {
  res.end(ids.toString())
})

server.listen(function() {
  console.log('Listen');
})


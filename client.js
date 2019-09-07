var coap        = require('coap');

// the default CoAP port is 5683

  var req = coap.request('coap://localhost/')

  req.on('response', function(res) {
    res.pipe(process.stdout)
    res.on('end', function() {

    })
  })

  req.end()


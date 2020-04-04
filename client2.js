const net = require('net')
const client = new net.Socket()
const port = 7000
const host = '192.168.1.16'

client.connect(port, host, function() {
    console.log('Connected');
    client.write("Hello From Client " + client.address().address);
    dataStream()
});

function dataStream() {
    setInterval(function(){ 
        client.write("sup")
        }, 1000);
}
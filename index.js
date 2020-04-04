const net = require('net')
const port = 7000
const host = '192.168.1.16'

const server = net.createServer()
server.listen(port, host, () => {
    console.log(`http://${host}:${port}`)
})

let sockets = []

server.on('connection', function(sock) {
    console.log(`Connected @ ${sock.remoteAddress}:${sock.remotePort}`)
    sockets.push(sock);

    sock.on('data', function(data) {
        console.log(`Data @ ${sock.remotePort}`)
        // Write the data back to all the connected, the client will receive it as data from the server
        // sockets.forEach(function(sock) {
        //     sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n')
        // })
    })

    sock.on('close', function(data) {
        let index = sockets.findIndex(function(o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort
        })
        if (index !== -1) sockets.splice(index, 1)
        console.log(`disconnection @ port ${sock.remotePort}`)
    })
})
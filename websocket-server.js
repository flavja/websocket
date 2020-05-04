const WebSocket = require('ws');
/**
 * CLIENT
 */
const webSocketServer = new WebSocket.Server({ port: process.env.WS_PORT });

webSocketServer.on('connection', webSocket => {
    console.log('Connection established');

    webSocket.on('message', messageEvent => {
        console.log('A message was sent')
        webSocketServer.clients.forEach( client => {
            if (client.readyState === WebSocket.OPEN){
                client.send(messageEvent);
            }
        })
    });
});

webSocketServer.on('error', (error) => {
    console.log('Error occured ', error);
});

webSocketServer.on('close', function close() {
    console.log('Connection closed by the client');
});

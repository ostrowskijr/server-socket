import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({
    host: '127.0.0.1',
    port: 8080
});
wss.addListener('listening', () => console.log(`Server listening!`));

const connectionServer = (webSocket: WebSocket) => {
    console.log(`Connection open to server! ${webSocket.url}`);
    //    
    webSocket.on('error', (err: Error) => console.error(err));
    //
    webSocket.on('message', (data: string) => {
        console.log(`Received on client: ${data}`);
        //
        if (data.toString() === 'close') {
            webSocket.close();
            webSocket.send(`Connection closed successfully on server`);
        }
        webSocket.send(`Received success on client: ${data}`);
    });
    //
    webSocket.on('close', () => {
        console.log(`Connection closed successfully on client`);
    });
};

wss.on('connection', connectionServer);

export { wss as WebSocketServer }
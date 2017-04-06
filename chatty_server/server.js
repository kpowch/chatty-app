const express = require('express');
const WebSocket = require('ws');
const uuidV1 = require('uuid/v1');

const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

// Broadcast to all
wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  });
};

// Set up a callback that will run when a client connects to the server. When a client
// connects they are assigned a socket, represented by the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // update the number of users currently on the page
  const userCount = wss.clients.size;
  wss.broadcast(JSON.stringify({type: 'userCount', userCount: userCount}));

  // broadcast messages (new messages or notification of username change) to all users
  ws.on('message', (data) => {
    const message = JSON.parse(data); // since it's being sent as JSON.stringify

    if (message.type === 'postMessage') {
      message.type = 'incomingMessage';
      message.id = uuidV1(); // create new id for element
    } else if (message.type = 'postNotification') {
      message.type = 'incomingNotification';
      message.id = uuidV1();
    }
    // broadcast message to all
    wss.broadcast(JSON.stringify(message));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    // update the number of users currently on the page
    const userCount = wss.clients.size;
    wss.broadcast(JSON.stringify({type: 'userCount', userCount: userCount}));
  });
});

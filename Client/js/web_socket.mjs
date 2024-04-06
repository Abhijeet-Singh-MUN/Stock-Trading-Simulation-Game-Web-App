// public/js/websocket.js

const socket = new WebSocket('ws://localhost:8080'); // WebSocket connection to server

socket.addEventListener('open', function (event) {
  console.log('WebSocket connection established');
});

socket.addEventListener('message', function (event) {
  console.log('Received message from server:', event.data);
  // Handle received message from server
});

socket.addEventListener('close', function (event) {
  console.log('WebSocket connection closed');
});

// Function to send message to server
function sendMessage(message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(message);
    console.log('Sent message to server:', message);
  } else {
    console.error('WebSocket connection is not open');
  }
}

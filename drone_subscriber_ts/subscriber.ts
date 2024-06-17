import * as http from 'http';
import * as WebSocket from 'ws';
// @ts-ignore
import Redis from 'ioredis';

const redisClient = new Redis({
  host: 'localhost', // Replace with your Redis server address
  port: 6379,
});

const server = http.createServer();

const wss = new WebSocket.Server({ server });

wss.on('connection', async (ws: WebSocket) => {
  console.log('Client connected');

  try {
    const pubSub = await redisClient.subscribe('drone_coordinates');
    console.log('Subscribed to channel: drone_coordinates');

    redisClient.on('message', (channel: string, message: string) => {
      console.log(`Received message from ${channel}: ${message}`);
      ws.send(message);
    });
  } catch (err) {
    console.error('Failed to subscribe:', err);
  }
});

server.on('request', (req, res) => {
  res.writeHead(404);
  res.end();
});

server.listen(8080, () => {
  console.log('Server started on port 8080');
});
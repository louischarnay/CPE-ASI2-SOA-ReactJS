import express, { Express, Request, Response } from "express";
import stompit from "stompit";
import { Server } from 'socket.io';
import { createServer } from 'http';
import { MessageSentByClient } from "./models/message.model";

const app: Express = express();
const PORT = 4000;

const server = createServer(app);

// Configure connection to ActiveMQ broker
const connectOptions = {
  host: 'localhost',
  port: 61613,
  connectHeaders: {
    host: '/'
  }
};

app.get("/", (req: Request, res: Response) => {
  res.send("Backend Node");

  stompit.connect(connectOptions, (error, client) => {
    if (error) {
      console.error('Connection error:', error.message);
      return;
    }

    console.log('Connected to ActiveMQ broker');

    // Send a message
    const sendHeaders = {
      'destination': '/queue/test',
      'content-type': 'text/plain'
    };

    const frame = client.send(sendHeaders);
    frame.write('Hello, ActiveMQ!');
    frame.end();
  });
});

const ioServer = new Server(server, {
  cors: {
    origin: "*",  // Allow only React client
    methods: ["GET", "POST"]
  }
});

ioServer.on('connection', (socket) => {
  console.log('a user connected');
  // GET ALL USERS
  socket.on('message-send', (data: MessageSentByClient) => {
    // IF USER NOT EXISTS, GET USER
    console.log('Data received from client:', data);
    const messageReceived = {
      userId: data.userId,
      userName: 'Toto',
      content: data.content,
      date: new Date(),
    };
    socket.emit('message-receive', messageReceived);
  });
});

server.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
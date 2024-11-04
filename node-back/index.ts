import express, { Express, Request, Response } from "express";
import stompit from "stompit";
import { Server } from 'socket.io';
import { createServer } from 'http';
import { MessageSentByClient } from "./models/message.model";
import { UserService } from "./services/user.service";

const app: Express = express();
const PORT = 4000;

const server = createServer(app);

const esb = {
  host: 'localhost',
  port: 61613,
  connectHeaders: {
    host: '/'
  }
};

app.get("/", (req: Request, res: Response) => {
  res.send("Backend Node");

const ioServer = new Server(server, {
  cors: {
    origin: "http://frontend:3000",
    methods: ["GET"]
  }
});

const userService = new UserService();

ioServer.on('connection', (socket) => {
  userService.fetchAllUsers();
  console.log('a user connected');

  socket.on('message-send', async (data: MessageSentByClient) => {
    console.log('Data received from client:', data);

    const userName = await userService.getUserName(data.userId);
    if (!userName) {
      console.error(`User with ID ${data.userId} not found`);
      return;
    }

    stompit.connect(esb, (error: Error | null, client: stompit.Client) => {
      
      if (error) {
        console.error('Connection error:', error.message);
        return;
      }
  
      const sendHeaders = {
        'destination': '/queue/test',
        'content-type': 'application/json',
      };
  
      const frame = client.send(sendHeaders);
      frame.write(JSON.stringify(data));
      frame.end();
    });

    const messageReceived = {
      userId: data.userId,
      userName,
      content: data.content,
      date: new Date(),
    };
    
    socket.emit('message-receive', messageReceived);
    });
  });
});

server.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
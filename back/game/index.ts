import express, { Express, Request, Response } from "express";
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { ChatSocket } from "./sockets/chat.socket";
import { RoomSocket } from "./sockets/room.socket";

const app: Express = express();
const PORT = 4000;

const server = createServer(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Backend Node");

  const ioServer = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  ioServer.on('connection', (socket: Socket) => {
    console.log('a user connected');

    const chatSocket = new ChatSocket(socket);
    const roomSocket = new RoomSocket(socket);

    chatSocket.init();
    roomSocket.init();
  });
});

server.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
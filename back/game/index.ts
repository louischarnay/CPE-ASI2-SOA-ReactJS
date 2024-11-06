import express, { Express, Request, Response } from "express";
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { ChatSocket } from "./sockets/chat.socket";
import { RoomSocket } from "./sockets/room.socket";

const app: Express = express();
const PORT = 4000;

const server = createServer(app);

const ioServer = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

(async () => {
  const chatSocket = await ChatSocket.init();
  const roomSocket = RoomSocket.init();

  ioServer.on('connection', (socket: Socket) => {
    console.log('a user connected');

    chatSocket.runSocket(socket);
    roomSocket.runSocket(socket);
  });

  server.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
})();
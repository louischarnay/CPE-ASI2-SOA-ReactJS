import { Socket } from "socket.io";
import { CreateRoom, generateRoomId, JoinRoom, Room } from "../models/room.model";

const CREATE_ROOM_EVENT = 'create-room';
const CREATED_ROOM_EVENT = 'created-room';
const JOIN_ROOM_EVENT = 'join-room';
const JOINED_ROOM_EVENT = 'joined-room';

export class RoomSocket {
  private rooms: Room[] = [];

  private constructor() {}

  static init(): RoomSocket {
    return new RoomSocket();
  }

  runSocket(socket: Socket) {
    socket.on(CREATE_ROOM_EVENT, async ({ userId }: CreateRoom) => {
      console.log(`Room created from client ${userId}`);

      const newRoom: Room = {
        id: generateRoomId(this.rooms),
        player1: {
          id: userId,
          cards: [],
        },
      };
      this.rooms.push(newRoom);
      socket.emit(CREATED_ROOM_EVENT, newRoom);
    });

    socket.on(JOIN_ROOM_EVENT, async ({ userId, roomId }: JoinRoom) => {
      console.log(`Room ${roomId} joined from client ${userId}`);

      const room = this.rooms.find((room) => room.id === roomId);
      if (!room) {
        console.error(`Room with ID ${roomId} not found`);
        return;
      }

      if (room.player2) {
        console.error(`Room with ID ${roomId} is already full`);
        return;
      }

      room.player2 = {
        id: userId,
        cards: [],
      };

      socket.emit(JOINED_ROOM_EVENT, room);
    });
  }
}
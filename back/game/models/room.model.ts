type Player = {
  id: number;
  cards: number[];
};

export type Room = {
  id: number;
  player1: Player;
  player2?: Player;
};

export type CreateRoom = {
  userId: number;
};

export type JoinRoom = {
  userId: number;
  roomId: number;
};

export function generateRoomId(rooms: Room[]): number {
  const ids = rooms.map((room) => room.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
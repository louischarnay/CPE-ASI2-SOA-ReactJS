export type Player = {
  id: number;
  cards: number[];
};

export type Room = {
  id: number;
  player1: Player;
  player2: Player;
};

export function generateRoomId(rooms: Room[]): number {
  if (rooms.length === 0) return 0;
  const ids = rooms.map((room) => room.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
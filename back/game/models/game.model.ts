import { Card } from "./card.model";

export type NewPlayer = {
  id: number;
  cards: number[];
};

export type GameCard = Card & {
  currentHp: number;
}

export type Player = {
  id: number;
  remainingActions: number;
  cards: GameCard[];
};

export type Game = {
  id: number;
  player1: Player;
  player2: Player;
  currentPlayer: number;
};

export type GamePlay = {
  gameId: number;
  playerId: number;
  cardId: number;
  targetCardId: number;
};

export type EndTurn = {
  gameId: number;
  playerId: number;
};
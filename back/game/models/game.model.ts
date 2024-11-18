import { Card } from "./card.model";

export type NewPlayer = {
  id: number;
  cards: number[];
};

export type GameCard = Card & {
  health: number;
}

export type Player = {
  id: number;
  cards: GameCard[];
};

export type Game = {
  id: number;
  player1: Player;
  player2: Player;
  currentPlayer: number;
};
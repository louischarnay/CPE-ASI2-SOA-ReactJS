import { Card } from "../models/card.model";
import { MONOLITHIC_URL } from "./url.constants";

export class CardService {
  private allCards: Card[] = [];

  get cards(): Card[] {
    return this.allCards;
  }

  public async fetchAllCards() {
    try {
      const response = await fetch(`${MONOLITHIC_URL}/cards`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Error fetching cards: ${response.statusText}`);
      }

      this.allCards = await response.json();
    } catch (error) {
      console.error("Failed to fetch cards:", error);
    }
  }

  public async getCardById(id: number): Promise<Card | null> {
    const existingCard = this.allCards.find((card) => card.id === id);
    if (existingCard) return existingCard;

    try {
      const response = await fetch(`${MONOLITHIC_URL}/card/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Error fetching card ${id}: ${response.statusText}`);
      }

      const card: Card = await response.json();
      this.allCards.push(card);
      return card;
    } catch (error) {
      console.error(`Failed to fetch card ${id}: ${error}`);
      return null;
    }
  }
}

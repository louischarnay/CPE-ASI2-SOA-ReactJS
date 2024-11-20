import { Card } from "../models/card.model";
import { MONOLITHIC_URL } from "./url.constants";

export class CardService {
  private constructor() {}

  public static async getCardById(id: number): Promise<Card | null> {
    try {
      const response = await fetch(`${MONOLITHIC_URL}/card/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Error fetching card ${id}: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Failed to fetch card ${id}: ${error}`);
      return null;
    }
  }
}

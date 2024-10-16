import { apiFetch } from "../utils/apiFetch";

export class CardService {
    static async getAllCards() {
        return apiFetch('/cards', 'GET');
    }

    static async getUserCards(userId: number) {
        const result = await apiFetch(`/cards`, 'GET');
        console.log(result);
        return result.filter((card: any) => card.userId === userId);
    }
}
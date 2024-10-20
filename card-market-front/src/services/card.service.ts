import { apiFetch } from "../utils/apiFetch";
import config from "../config/config.json"

export class CardService {
    static async getAllCards() {
        return apiFetch('/store/cards_to_sell', 'GET');
    }

    static async getUserCards(userId: number) {
        const result = await apiFetch(`/cards`, 'GET');
        return result.filter((card: any) => card.userId === userId);
    }

    static async generateCard(imagePrompt: string, descPrompt: string) {
        return await apiFetch(`/generateCard`, 'POST', {imagePrompt, descPrompt}, undefined, config.generateUrl);
    }
}
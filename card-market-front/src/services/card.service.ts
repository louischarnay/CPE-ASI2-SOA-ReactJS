import { apiFetch } from "../utils/apiFetch";

export class CardService {
    static async getAllCards() {
        return apiFetch('/store/cards_to_sell', 'GET');
    }

    static async getUserCards(userId: number) {
        const result = await apiFetch(`/cards`, 'GET');
        return result.filter((card: any) => card.userId === userId);
    }

    static async generateCard(imagePrompt: string, descriptionPrompt: string) {
        const result = await apiFetch(`/generateCard`, 'POST', {imagePrompt, descriptionPrompt});
    }
}
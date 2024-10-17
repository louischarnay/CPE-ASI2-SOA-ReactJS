import { apiFetch } from "../utils/apiFetch";

export class StoreService {
    static async sell(cardId: number, userId: number) {
        return apiFetch(`/store/sell`, 'POST', {cardId: cardId, userId: userId, storeId: 0})
    }
}
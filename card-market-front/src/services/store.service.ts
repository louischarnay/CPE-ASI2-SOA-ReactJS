import { apiFetch } from "../utils/apiFetch";

export class StoreService {

    static async sell(cardId: number, userId: number) {
        return apiFetch(`/store/sell`, 'POST', {card_id: cardId, user_id: userId, store_id: 0})
    }

    static async buy(cardId: number, userId: number) {
        return apiFetch(`/store/buy`, 'POST', {card_id: cardId, user_id: userId, store_id: 0})
    }
}
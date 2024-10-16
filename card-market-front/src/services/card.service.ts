import { apiFetch } from "../utils/apiFetch";

export class CardService {
    static async getAllCards() {
        return apiFetch('/cards', 'GET');
    }
}
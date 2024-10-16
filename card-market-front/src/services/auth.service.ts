import AuthCredentials from "../models/AuthCredentials";
import { apiFetch } from "../utils/apiFetch";

export class AuthService {
    static async login(credentials: AuthCredentials) : Promise<number> {
        return apiFetch('/auth', 'POST', credentials);
    }
}
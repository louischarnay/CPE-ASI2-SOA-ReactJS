import AuthCredentials from "../models/AuthCredentials";
import RegisterCredentials from "../models/register-creditentials.model";
import User from "../models/user.model";
import { apiFetch } from "../utils/apiFetch";

export class AuthService {
    static async login(credentials: AuthCredentials) : Promise<number> {
        return apiFetch('/auth', 'POST', credentials);
    }

    static async register(credentials: RegisterCredentials) : Promise<User> {
        return apiFetch('/user', 'POST', credentials);
    }
}
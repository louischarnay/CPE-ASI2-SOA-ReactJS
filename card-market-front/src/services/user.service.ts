import User from "../models/user.model";
import { apiFetch } from "../utils/apiFetch";

export class UserService {
    static async getUserById(id: number) : Promise<User> {
        return apiFetch(`/user/${id}`, 'GET')
    }
}
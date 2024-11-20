import { User } from "../models/user.model";
import { MONOLITHIC_URL } from "./url.constants";

export class UserService {
  private constructor() {}

  public static async getUserById(id: number): Promise<User | null> {
    try {
      const response = await fetch(`${MONOLITHIC_URL}/user/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Error fetching user ${id}: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Failed to fetch user ${id}: ${error}`);
      return null;
    }
  }
}

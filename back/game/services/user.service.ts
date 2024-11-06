import { User } from "../models/user.model";

export class UserService {
    private MONOLITHIC_URL = "http://backend-monolithic:8080";

    private allUsers = new Map<number, string>();

    get users(): Map<number, string> {
        return this.allUsers;
    }

    public async fetchAllUsers() {
        try {
            const response = await fetch(`${this.MONOLITHIC_URL}/users`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
        
            if (!response.ok) {
                throw new Error(`Error fetching users: ${response.statusText}`);
            }
        
            const users: User[] = await response.json();
            this.allUsers = new Map(users.map((user) => [user.id, user.surName]));
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    }

    public async getUserName(id: number): Promise<string | null> {
        const savedUser = this.allUsers.get(id);
        if (savedUser) return savedUser;
        const newUser = await this.getUserById(id);
        return newUser ? newUser.surName : null;
    }

    private async getUserById(id: number): Promise<User | null> {
        try {
            const response = await fetch(`${this.MONOLITHIC_URL}/user/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
        
            if (!response.ok) {
                throw new Error(`Error fetching user ${id}: ${response.statusText}`);
            }
        
            const user: User = await response.json();
            this.allUsers.set(user.id, user.surName);
            return user;
        } catch (error) {
            console.error(`Failed to fetch user ${id}: ${error}`);
            return null;
        }
    }
}

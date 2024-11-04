import { User } from "../models/user.model";

const MONOLITHIC_URL = "http://localhost:8080";

export async function getAllUsers(): Promise<User[]> {
    try {
        const response = await fetch(`${MONOLITHIC_URL}/users`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (!response.ok) {
            throw new Error(`Error fetching users: ${response.statusText}`);
        }
    
        const users: User[] = await response.json();
        return users;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        throw error;
    }
}

export async function getUser(id: number): Promise<User> {
    try {
        const response = await fetch(`${MONOLITHIC_URL}/user/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (!response.ok) {
            throw new Error(`Error fetching user ${id}: ${response.statusText}`);
        }
    
        const user: User = await response.json();
        return user;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        throw error;
    }
}
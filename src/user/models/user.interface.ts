
export interface User {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: UserRole;
}

export enum UserRole {
    ADMIN = 'Admin',
    USER = 'User',
    MANAGER = 'Manager'
}